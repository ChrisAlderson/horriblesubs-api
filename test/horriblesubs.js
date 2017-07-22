'use strict'

const { expect } = require('chai')
const HorribleSubsAPI = require('../horriblesubs-api')

describe('HorribleSubs', () => {
  let horriblesubsAPI, oneSeason, multiSeasons, lowQuality

  before(() => {
    console.warn = () => {}
    horriblesubsAPI = new HorribleSubsAPI({
      debug: true
    })
    oneSeason = {
      link: '/shows/mangirl',
      slug: 'mangirl',
      title: 'Mangirl!'
    }
    multiSeasons = {
      link: '/shows/ace-of-diamond-s2/',
      slug: 'ace-of-diamond-s2',
      title: 'Ace of Diamond Season Two'
    }
    lowQuality = {
      link: '/shows/one-piece/',
      slug: 'one-piece',
      title: 'One Piece'
    }
  })

  function testAnimeAttributes(anime) {
    expect(anime).to.be.an('object')
    expect(anime.link).to.be.a('string')
    expect(anime.slug).to.be.a('string')
    expect(anime.title).to.be.a('string')
  }

  it('should get a list of anime shows', done => {
    horriblesubsAPI.getAllAnime().then(res => {
      expect(res).to.be.an('array')
      expect(res.length).to.be.at.least(1)

      const random = Math.floor(Math.random() * res.length)
      testAnimeAttributes(res[random])

      done()
    }).catch(done)
  })

  it('should get episodes of an anime with one season', done => {
    horriblesubsAPI = new HorribleSubsAPI()
    horriblesubsAPI.getAnimeData(oneSeason).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  })

  it('should get episodes of an anime with multiple seasons', done => {
    horriblesubsAPI.getAnimeData(multiSeasons).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  })

  it('should get episodes of an anime with low quality episodes', done => {
    horriblesubsAPI.getAnimeData(lowQuality).then(res => {
      testAnimeAttributes(res)
      expect(res.hs_showid).to.be.a('number')
      expect(res.episodes).to.be.an('object')

      done()
    }).catch(done)
  })
})
