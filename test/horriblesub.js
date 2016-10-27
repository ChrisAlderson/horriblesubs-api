"use strict";

const chai = require("chai");
const assert = chai.assert;
const HorribleSubsAPI = require("../horriblesubs-api");

describe("HorribleSubs", () => {

  let horriblesubsAPI, data;
  before(() => {
    horriblesubsAPI = new HorribleSubsAPI({
      cloudflare: true
    });
    data = {
      link: "/shows/one-piece",
      slug: "one-piece",
      title: "One Piece"
    };
  });

  it("Should get a list of anime shows", done => {
    horriblesubsAPI.getAllAnime().then(res => {
      assert.isArray(res);
      done();
    }).catch(err => done(err));
  });

  it("Should get episodes of an anime", done => {
    horriblesubsAPI.getAnimeData(data).then(res => {
      assert.isObject(res);
      done();
    }).catch(err => done(err));
  });

});
