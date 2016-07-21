const asyncq = require("async-q");
const cheerio = require("cheerio");
const req = require("request");

const defaultOptions = {
  "baseUrl": "http://horriblesubs.info",
  "timeout": 3 * 1000
};

module.exports = class HorribleSubsAPI {

  constructor(options = defaultOptions, debug = false) {
    this.request = req.defaults(options);
    this.debug = debug;

    this.horribleSubsMap = {
      "91-days": "ninety-one-days",
      "ace-of-diamond": "diamond-no-ace",
      "zx-ignition": "z-x-ignition",
      "chouyaku-hyakuninisshu-uta-koi": "utakoi"
    };
  };

  get(uri, qs, retry = true) {
    if (this.debug) console.warn(`Making request to: '${uri}'`);
    return new Promise((resolve, reject) => {
      this.request.get({ uri, qs }, (err, res, body) => {
        if (err && retry) {
          return resolve(this.get(uri, qs, false));
        } else if (err) {
          return reject(err);
        } else if (!body || res.statusCode >= 400) {
          return reject(new Error(`No data found with url: '${uri}', statusCode: ${res.statusCode}`));
        } else {
          return resolve(cheerio.load(body));
        }
      });
    });
  };

  getAllAnime() {
    return this.get("/shows/").then($ => {
      const anime = [];
      $("div.ind-show.linkful").map(function () {
        const entry = $(this).find("a");
        anime.push({
          link: entry.attr("href"), slug: entry.attr("href").match(/\/shows\/(.*)/i)[1],
          title: entry.attr("title")
        });
      });
      return anime;
    });
  };

  getAnimeId(data) {
    return this.get(data.link).then($ => {
      const variable = "var hs_showid =";
      const text = $("script").text();
      const chopFront = text.substring(text.search(variable) + variable.length, text.length);
      data.hs_showid = JSON.parse(chopFront.substring(0, chopFront.search(";")));
      return data;
    });
  };

  getAnimeData(data) {
    return this.getAnimeId(data).then(res => {
      let busy = true;
      let page = 0;

      data.episodes = {};
      const horribleSubsMap = this.horribleSubsMap;

      return asyncq.whilst(() => busy, () => {
        const qs = {
          type: "show",
          showid: res.hs_showid,
          nextid: page
        };

        return this.get("/lib/getshows.php", qs).then($ => {
          const table = $("table.release-table");

          if (table.length === 0) {
            busy = false;
            return data;
          }

          table.each(function () {
            const entry = $(this);

            const label = entry.find("td.dl-label").text();
            const magnet = entry.find("td.dl-type.hs-magnet-link").find("a").attr("href");

            const torrent = {
              url: magnet,
              seeds: 0,
              peers: 0,
              provider: "HorribleSubs"
            }

            const seasonal = /(.*).[Ss](\d)\s-\s(\d+).\[(\d{3,4})p\]/i;
            const oneSeason = /(.*)\s-\s(\d+).\[(\d{3,4})p\]/i;
            let slug, season, episode, quality;
            if (label.match(seasonal)) {
              data.slug = label.match(seasonal)[1].replace(/[!]/gi, "").replace(/\s-\s/gi, "").replace(/\s+/g, "-").toLowerCase();
              season = parseInt(label.match(seasonal)[2], 10);
              episode = parseInt(label.match(seasonal)[3], 10);
              quality = parseInt(label.match(seasonal)[4], 10);
            } else if (label.match(oneSeason)) {
              data.slug = label.match(oneSeason)[1].replace(/[!]/gi, "").replace(/\s-\s/gi, "").replace(/\s+/g, "-").toLowerCase();
              season = 1;
              episode = parseInt(label.match(oneSeason)[2], 10);
              quality = parseInt(label.match(oneSeason)[3], 10);
            }

            data.slug = data.slug in horribleSubsMap ? horribleSubsMap[data.slug] : data.slug;
            if (season && episode && quality) {
              if (!data.episodes[season]) data.episodes[season] = {};
              if (!data.episodes[season][episode]) data.episodes[season][episode] = {};
              if (!data.episodes[season][episode][quality]) data.episodes[season][episode][quality] = torrent;
            }
          });

          page++;
          // console.log(data);
          return data;
        });
      }).then(value => data);
    });
  };

};
