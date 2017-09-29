// Import the necessary modules.
const { expect } = require('chai')

const HorribleSubsApi = require('..')

/** @test {HorribleSubsApi} */
describe('HorribleSubsApi', () => {
  /**
   * The HorribleSubsApi instance.
   * @type {HorribleSubsApi}
   */
  let horriblesubs

  /**
   * An anime with one season.
   * @type {Anime}
   */
  let oneSeason

  /**
   * An anime with multiple seasons.
   * @type {Anime}
   */
  let multiSeasons

  /**
   * An anime without episodes.
   * @type {Anime}
   */
  let noEpisodes

  before(() => {
    horriblesubs = new HorribleSubsApi({
      debug: true
    })

    oneSeason = {
      link: '/shows/91-days',
      slug: '91-days',
      title: '91 Days'
    }
    multiSeasons = {
      link: '/shows/ace-of-diamond-s2/',
      slug: 'ace-of-diamond-s2',
      title: 'Ace of Diamond Season Two'
    }
    noEpisodes = {
      link: '/shows/3-gatsu-no-lion',
      slug: '3-gatsu-no-lion',
      title: '3-gatsu no Lion'
    }

    HorribleSubsApi._horribleSubsMap = {
      '91-days': 'ninety-one-days'
    }
  })

  /**
   * Test if an anime has certain attributes.
   * @param {Anime} anime - The anime to test the attributes of.
   * @returns {undefined}
   */
  function testAnimeAttributes(anime) {
    expect(anime).to.be.an('object')
    expect(anime.link).to.be.a('string')
    expect(anime.slug).to.be.a('string')
    expect(anime.title).to.be.a('string')
  }

  /** @test {HorribleSubsApi#getAllAnime} */
  it('should get a list of anime shows', done => {
    horriblesubs.getAllAnime().then(res => {
      expect(res).to.be.an('array')
      expect(res.length).to.be.at.least(1)

      const random = Math.floor(Math.random() * res.length)
      testAnimeAttributes(res[random])

      done()
    }).catch(done)
  })

  /** @test {HorribleSubsApi#getAnimeData} */
  it('should get episodes of an anime with one season', done => {
    horriblesubs = new HorribleSubsApi()
    horriblesubs.getAnimeData(oneSeason).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  })

  /** @test {HorribleSubsApi#getAnimeData} */
  it('should get episodes of an anime with multiple seasons', done => {
    horriblesubs.getAnimeData(multiSeasons).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  })

  /** @test {HorribleSubsApi@getAnimeData} */
  it('should get episodes of an anime with no episodes', done => {
    horriblesubs.getAnimeData(noEpisodes).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  })

  /** @test {HorribleSubsApi#getAnimeData} */
  /* it('should get episodes of an anime with low quality episodes', done => {
    horriblesubs.getAnimeData(lowQuality).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  }) */
})
