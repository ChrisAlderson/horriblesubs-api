'use strict';

const asyncq = require('async-q');
const cheerio = require('cheerio');
const req = require('request');
const cloudscraper = require('cloudscraper');

const defaultOptions = {
  'baseUrl': 'http://horriblesubs.info',
  'timeout': 3 * 1000
};

module.exports = class HorribleSubsAPI {

  constructor({options = defaultOptions, debug = false, cloudflare = false} = {}) {
    if (cloudflare) {
      this.cloudflare = true;
      this.request = cloudscraper.request;
      this.options = options;
      if (debug) {
        console.warn('Processing with cloudscraper...');
      }
    } else {
      this.request = req.defaults(options).get;
    }
    this.debug = debug;

    this.horribleSubsMap = {
      '91-days': 'ninety-one-days',
      'ace-attorney': 'gyakuten-saiban',
      'ace-of-diamond': 'diamond-no-ace',
      'active-raid': 'active-raid-kidou-kyoushuushitsu-dai-hakkei',
      'ai-mai-mi-mousou-catastrophie': 'ai-mai-mi-mousou-catastrophe',
      'akagami-no-shirayukihime': 'akagami-no-shirayuki-hime',
      'akb0048': 'akb0048-first-stage',
      'alderamin-on-the-sky': 'nejimaki-seirei-senki-tenkyou-no-alderamin',
      'ani-tore-ex': 'anitore-ex',
      'argevollen': 'shirogane-no-ishi-argevollen',
      'arpeggio-of-blue-steel-ars-nova': 'aoki-hagane-no-arpeggio-ars-nova',
      'arslan-senki': 'kigyou-senshi-arslan',
      'assassination-classroom': 'ansatsu-kyoushitsu',
      'b-project': 'b-project-kodou-ambitious',
      'battle-girls-time-paradox': 'sengoku-otome-momoiro-paradox',
      'blazbluealter-memory': 'blazblue-alter-memory',
      'bonjour-sweet-love-patisserie': 'bonjour-koiaji-patisserie',
      'bottom-biting-bug': 'oshiri-kajiri-mushi',
      'brotherhoodfinal-fantasy-xv': 'brotherhood-final-fantasy-xv',
      'brynhildr-in-the-darkness': 'gokukoku-no-brynhildr',
      'cardfight-vanguard-g-girs-crisis': 'cardfight-vanguard-g-gears-crisis-hen',
      'chaos-dragon': 'chaos-dragon-sekiryuu-seneki',
      'concrete-revolutio': 'concrete-revolutio-choujin-gensou',
      'croisee-in-a-foreign-labyrinth': 'ikoku-meiro-no-croisee',
      'cross-ange': 'cross-ange-tenshi-to-ryuu-no-rinbu',
      'd.gray-man-hallow': 'd-gray-man-hallow',
      'daimidaler': 'kenzen-robo-daimidaler',
      'danganronpa-3-future-arc': 'danganronpa-3-the-end-of-kibougamine-gakuen-mirai-hen',
      'danganronpa-the-animation': 'danganronpa-kibou-no-gakuen-to-zetsubou-no-koukousei-the-animation',
      'danmachi': 'dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-no-darou-ka',
      'dd-hokuto-no-ken-2-ichigo-aji-': 'dd-hokuto-no-ken-2-ichigo-aji',
      'diabolik-lovers-more-blood': 'diabolik-lovers-2nd-season',
      'digimon-adventure-tri': 'digimon-adventure-tri-4',
      'dusk-maiden-of-amnesia': 'tasogare-otome-x-amnesia',
      'ebiten': 'ebiten-kouritsu-ebisugawa-koukou-tenmonbu',
      'engaged-to-the-unidentified': 'mikakunin-de-shinkoukei',
      'fuse-memoirs-of-the-hunter-girl': 'fuse-teppou-musume-no-torimonochou',
      'garo-the-animation': 'garo-honoo-no-kokuin-special',
      'garo-the-crimson-moon': 'garo-guren-no-tsuki',
      'garothe-crimson-moon': 'garo-guren-no-tsuki',
      'gate': 'gate-jieitai-kanochi-nite-kaku-tatakaeri',
      'gen-ei-o-kakeru-taiyou-il-sole-penetra-le-illusioni': 'genei-wo-kakeru-taiyou',
      'ghost-in-the-shell-arise-alternative-architecture': 'ghost-in-the-shell-arise-tv',
      'girl-friend-beta': 'girlfriend-kari',
      'gundam-reconguista-in-g': 'gundam-g-no-reconguista',
      'gundam-unicorn': 'mobile-suit-gundam-unicorn',
      'hackadoll-the-animation': 'hacka-doll-the-animation',
      'hakkenden-eight-dogs-of-the-east': 'hakkenden-touhou-hakken-ibun',
      'hakuoki-reimeiroku': 'hakuouki-reimeiroku',
      'hamatora': 'hamatora-the-animation',
      'haruchika': 'haruchika-haruta-to-chika-wa-seishun-suru',
      'hayate-no-gotoku-cuties': 'hayate-the-combat-butler-cuties',
      'hentai-ouji-to-warawanai-neko': 'hentai-ouji-to-warawanai-neko-specials',
      'hi-scoool-seha-girl': 'sega-hard-girls',
      'highschool-dxd-born': 'high-school-dxd-born',
      'hozuki-no-reitetsu': 'hoozuki-no-reitetsu',
      'hyperdimension-neptunia-the-animation': 'choujigen-game-neptune-the-animation',
      'imocho-another-shitty-sister-ln-adaptation': 'saikin-imouto-no-yousu-ga-chotto-okashiin-da-ga',
      'infinite-stratos-2': 'is-infinite-stratos-2',
      'inu-x-boku-secret-service': 'inu-x-boku-ss',
      'k-return-of-kings': 'k-2015',
      'k': 'k-project',
      'kaasan-mom-s-life': 'mainichi-kaasan',
      'kabaneri-of-the-iron-fortress': 'koutetsujou-no-kabaneri',
      'kaiji-s2-against-all-rules': 'gyakkyou-burai-kaiji-hakairoku-hen',
      'kaiji-ultimate-survivor': 'gyakkyou-burai-kaiji-ultimate-survivor',
      'kamisama-kiss-2': 'kamisama-hajimemashita-2',
      'kamisama-kiss': 'kamisama-hajimemashita-kiss',
      'kamisama-no-memo-chou': 'kamisama-no-memochou',
      'kateikyoushi-hitman-reborn': 'katekyo-hitman-reborn',
      'kindaichi-case-files-r': 'kindaichi-shounen-no-jikenbo-returns',
      'kuroko-s-basketball': 'kuroko-no-basket',
      'kuroshitsuji-book-of-circus': 'black-butler-book-of-circus',
      'kyoukaisenjou-no-horizon': 'horizon-in-the-middle-of-nowhere',
      'la-corda-d-oro-blue-sky': 'kiniro-no-corda-blue-sky',
      'la-storia-della-arcana-famiglia': 'arcana-famiglia',
      'lance-n--masques': 'lance-n-masques',
      'litchi-hikari-club': 'litchi-de-hikari-club',
      'little-witch-academia-the-enchanted-parade': 'little-witch-academia-2',
      'locodol': 'futsuu-no-joshikousei-ga-locodol-yatte-mita',
      'love-live-the-school-idol-movie': 'love-live-school-idol-project-movie',
      'luck-&-logic': 'luck-logic',
      'lupin-iii-(2015)': 'lupin-iii',
      'magi': 'magi-the-labyrinth-of-magic',
      'magic-kaito-1412': 'magic-kaito-tv',
      'magical-girl-lyrical-nanoha-the-movie-2nd': 'mahou-shoujo-lyrical-nanoha-the-movie-2nd-a-s',
      'mahouka': 'mahouka-koukou-no-rettousei',
      'majestic-prince': 'ginga-kikoutai-majestic-prince',
      'majikoi~oh-samurai-girls': 'maji-de-watashi-ni-koi-shinasai',
      'mangaka-san-to-assistant-san-to': 'mangaka-san-to-assistant-san-to-the-animation',
      'maoyuu-maou-yuusha': 'maoyu',
      'maria-the-virgin-witch': 'junketsu-no-maria',
      'mekakucity-actors': 'mekaku-city-actors',
      'mondaijitachi-ga-isekai-kara-kuru-sou-desu-yo': 'problem-children-are-coming-from-another-world-aren-t-they',
      'moretsu-pirates': 'bodacious-space-pirates',
      'moritasan-wa-mukuchi': 'morita-san-wa-mukuchi',
      'mushibugyo': 'mushibugyou',
      'mushishi-tokubetsu-hen-hihamukage': 'mushishi-special-hihamukage',
      'my-sister-came-onee-chan-ga-kita': 'onee-chan-ga-kita',
      'naruto-sd-rock-lee-no-seishun-full-power-ninden': 'rock-lee-no-seishun-full-power-ninden',
      'naruto-shippuuden': 'naruto-shippuden',
      'ninja-slayer': 'ninja-slayer-from-animation',
      'no-rin': 'nourin',
      'no.-6': 'no-6',
      'non-non-biyori-repeat': 'non-non-biyori-2',
      'noukome': 'noucome-my-mental-choices-are-completely-interfering-with-my-school-romantic-comedy',
      'okusama-ga-seitokaichou': 'okusama-ga-seitokaichou-okusama-gekijou',
      'one-piece-3d2y': 'one-piece-3d2y-special',
      'one-week-friends': 'isshuukan-friends',
      'ore-twintail-ni-narimasu': 'ore-twintails-ni-narimasu',
      'parasyte-the-maxim': 'kiseijuu',
      'phi-brain': 'phi-brain-kami-no-puzzle',
      'photo-kano': 'photokano',
      'planetarian': 'planetarian-chiisana-hoshi-no-yume',
      'polar-bear-cafe': 'polar-bear-s-cafe',
      'poyopoyo': 'poyopoyo-kansatsu-nikki',
      'puzzle-and-dragons-cross': 'puzzle-dragons-x',
      'ro-kyu-bu-fast-break': 'ro-kyu-bu',
      'robotics;notes': 'robotics-notes',
      'rowdy-sumo-wrestler-matsutaro': 'abarenbou-kishi-matsutarou',
      'rozen-maiden-(2013)': 'rozen-maiden-zuruckspulen',
      'ryuugajou-nanana-no-maizoukin': 'ryuugajou-nanana-no-maizoukin-tv',
      'saekano': 'saenai-heroine-no-sodate-kata',
      'sailor-moon-crystal': 'bishoujo-senshi-sailor-moon-crystal',
      'saint-seiya-the-lost-canvas': 'saint-seiya-the-lost-canvas-meiou-shinwa',
      'sakamichi-no-apollon': 'kids-on-the-slope',
      'saki-episode-of-side-a': 'saki-achiga-hen-episode-of-side-a',
      'saki-the-nationals': 'saki-zenkoku-hen',
      'seisen-cerberus': 'seisen-cerberus-ryuukoku-no-fatalites',
      'seitokai-no-ichizon-lv.2': 'seitokai-no-ichizon-lv-2',
      'sengoku-musou-sanada-no-shou': 'sengoku-musou-sp-sanada-no-shou',
      'senki-zesshou-symphogear-g': 'senki-zesshou-symphogear-g-in-the-distance-that-day-when-the-star-became-music',
      'senki-zesshou-symphogear-gx': 'senki-zesshou-symphogear-3',
      'senki-zesshou-symphogear': 'senki-zesshou-symphogear-meteoroid-falling-burning-and-disappear-then',
      'seraph-of-the-end': 'owari-no-seraph',
      'she-and-her-cat-everything-flows': 'kanojo-to-kanojo-no-neko-everything-flows',
      'she-and-her-cat': 'kanojo-to-kanojo-no-neko',
      'shimoneta': 'shimoneta-to-iu-gainen-ga-sonzai-shinai-taikutsu-na-sekai',
      'shin-atashinchi': 'shin-atashin-chi',
      'shin-sekai-yori': 'shinsekai-yori',
      'shin-strange-': 'shin-strange',
      'shingeki-no-kyojin': 'attack-on-titan',
      'shokugeki-no-soma': 'shokugeki-no-souma',
      'shomin-sample': 'ore-ga-ojou-sama-gakkou-ni-shomin-sample-toshite-rachirareta-ken',
      'shounen-hollywood': 'shounen-hollywood-holly-stage-for-49',
      'so-i-can-t-play-h': 'dakara-boku-wa-h-ga-dekinai',
      'soniani-super-sonico-the-animation': 'super-sonico-the-animation',
      'space-brothers': 'uchuu-kyoudai',
      'space-dandy-2': 'space-dandy-2nd-season',
      'space-patrol-luluco': 'uchuu-patrol-luluco',
      'steins;gate': 'steins-gate',
      'stella-jogakuin-koutouka-c3-bu': 'stella-jogakuin-koutou-ka-c-bu',
      'straight-title-robot-anime': 'chokkyuu-hyoudai-robot-anime-straight-title',
      'strange-': 'strange',
      'suisei-no-gargantia': 'gargantia-on-the-verdurous-planet',
      'sukitte-ii-na-yo.': 'sukitte-ii-na-yo',
      'teekyu': 'teekyuu',
      'the-disappearance-of-nagato-yuki-chan': 'nagato-yuki-chan-no-shoushitsu',
      'the-idolm@ster-cinderella-girls': 'the-idolm-ster-cinderella-girls',
      'the-idolm@ster': 'the-idolm-ster',
      'the-knight-in-the-area': 'area-no-kishi',
      'the-new-prince-of-tennis-ova-vs-genius10': 'new-prince-of-tennis-ova-vs-genius10',
      'the-new-prince-of-tennis-specials': 'new-prince-of-tennis-specials',
      'the-new-prince-of-tennis': 'new-prince-of-tennis',
      'the-pilot-s-love-song': 'toaru-hikuushi-e-no-koiuta',
      'the-world-god-only-knows-goddesses-arc': 'the-world-god-only-knows-goddess-arc',
      'time-travel-shoujo': 'time-travel-shoujo-mari-waka-to-8-nin-no-kagakusha-tachi',
      'tokyo-ghoul-root-a': 'tokyo-ghoul-2',
      'tonari-no-kaibutsu-kun': 'my-little-monster',
      'tsukiuta.-the-animation': 'tsukiuta-the-animation',
      'twin-angel-twinkle-paradise': 'kaitou-tenshi-twin-angel-kyun-kyun-tokimeki-paradise',
      'unlimited-fafnir': 'juuou-mujin-no-fafnir',
      'usagi-drop': 'bunny-drop',
      'uta-no-prince-sama-2': 'uta-no-prince-sama-maji-love-2000',
      'uta-no-prince-sama-revolutions': 'uta-no-prince-sama-maji-love-3',
      'uta-no-prince-sama': 'uta-no-prince-sama-maji-love-1000',
      'utakoi': 'chouyaku-hyakuninisshu-uta-koi',
      'valvrave-the-liberator': 'kakumeiki-valvrave',
      'wake-up-girls-seven-idols': 'wake-up-girls-shichinin-no-idol',
      'wake-up-girls-zoo': 'wake-up-girl-zoo',
      'watamote': 'watashi-ga-motenai-no-wa-dou-kangaetemo-omaera-ga-warui',
      'wooser-no-sono-higurashi-mugen-hen': 'wooser-no-sono-higurashi',
      'working-': 'working-2',
      'working': 'working-1',
      'yahari-ore-no-seishun-love-come-wa-machigatteiru-zoku': 'yahari-ore-no-seishun-love-comedy-wa-machigatteiru-zoku',
      'yahari-ore-no-seishun-love-come-wa-machigatteiru': 'yahari-ore-no-seishun-love-comedy-wa-machigatteiru-ova',
      'yama-no-susume-2': 'yama-no-susume-second-season-ova',
      'yamada-kun-and-the-seven-witches': 'yamada-kun-to-7-nin-no-majo',
      'yami-shibai-japanese-ghost-stories-2': 'yami-shibai-2nd-season',
      'yami-shibai-japanese-ghost-stories-3': 'yami-shibai-3rd-season',
      'yami-shibai-japanese-ghost-stories': 'yami-shibai',
      'yuki-yuna-wa-yusha-de-aru': 'yuuki-yuuna-wa-yuusha-de-aru',
      'yurumate3dei': 'yurumates-3d',
      'yuruyuri': 'yuru-yuri',
      'yuushibu': 'yuusha-ni-narenakatta-ore-wa-shibushibu-shuushoku-wo-ketsui-shimashita',
      'zero-no-tsukaima-final': 'zero-no-tsukaima-f',
      'zx-ignition': 'z-x-ignition'
    };
  }

  get(uri, qs, retry = true) {
    if (this.debug) console.warn(`Making request to: '${uri}'`);
    return new Promise((resolve, reject) => {
      let options;
      if (this.cloudflare) {
        options = Object.assign({}, this.options, {method: 'GET', url: this.options.baseUrl + uri, qs});
        options.baseUrl = null;
      } else {
        options = { uri, qs };
      }
      this.request(options, (err, res, body) => {
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
  }

  getAllAnime() {
    return this.get('/shows/').then($ => {
      const anime = [];
      $('div.ind-show.linkful').map(function () {
        const entry = $(this).find('a');
        anime.push({
          link: entry.attr('href'), slug: entry.attr('href').match(/\/shows\/(.*)/i)[1],
          title: entry.attr('title')
        });
      });
      return anime;
    });
  }

  getAnimeId(data) {
    return this.get(data.link).then($ => {
      const variable = 'var hs_showid =';
      const text = $('script').text();
      const chopFront = text.substring(text.search(variable) + variable.length, text.length);
      data.hs_showid = JSON.parse(chopFront.substring(0, chopFront.search(';')));
      return data;
    });
  }

  getAnimeData(data) {
    return this.getAnimeId(data).then(res => {
      let busy = true;
      let page = 0;

      data.episodes = {};
      const horribleSubsMap = this.horribleSubsMap;

      return asyncq.whilst(() => busy, () => {
        const qs = {
          type: 'show',
          showid: res.hs_showid,
          nextid: page
        };

        return this.get('/lib/getshows.php', qs).then($ => {
          const table = $('table.release-table');

          if (table.length === 0) {
            busy = false;
            return data;
          }

          table.each(function () {
            const entry = $(this);

            const label = entry.find('td.dl-label').text();
            const magnet = entry.find('td.dl-type.hs-magnet-link').find('a').attr('href');

            const torrent = {
              url: magnet,
              seeds: 0,
              peers: 0,
              provider: 'HorribleSubs'
            };

            const season = 1;

            const seasonal = /(.*).[Ss](\d)\s-\s(\d+).\[(\d{3,4}p)\]/i;
            const oneSeason = /(.*)\s-\s(\d+).\[(\d{3,4}p)\]/i;
            let slug, episode, quality;
            if (label.match(seasonal)) {
              data.slug = label.match(seasonal)[1].replace(/[,!]/gi, '').replace(/\s-\s/gi, ' ').replace(/[\+\s\']/g, '-').toLowerCase();
              episode = parseInt(label.match(seasonal)[3], 10);
              quality = label.match(seasonal)[4];
            } else if (label.match(oneSeason)) {
              data.slug = label.match(oneSeason)[1].replace(/[,!]/gi, '').replace(/\s-\s/gi, ' ').replace(/[\+\s\']/g, '-').toLowerCase();
              episode = parseInt(label.match(oneSeason)[2], 10);
              quality = label.match(oneSeason)[3];
            }

            data.slug = data.slug in horribleSubsMap ? horribleSubsMap[data.slug] : data.slug;
            if (season && episode && quality && quality !== '360p') {
              if (!data.episodes[season]) data.episodes[season] = {};
              if (!data.episodes[season][episode]) data.episodes[season][episode] = {};
              if (!data.episodes[season][episode][quality]) data.episodes[season][episode][quality] = torrent;
            }
          });

          page++;
          return data;
        });
      }).then(value => data);
    });
  }

}
