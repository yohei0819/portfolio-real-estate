/**
 * ScrollTrigger アニメーション
 * loadingComplete 後にフェードイン・パララックス・カードスタガー等を初期化
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EVENT, CARD_GRIDS, ANIMATION, SELECTOR } from '../utils/Config.js'
import { $, $$ } from '../utils/DOMHelper.js'

export default class ScrollAnimations {
  /** @type {boolean} */
  #initialized = false

  constructor() {
    document.addEventListener(EVENT.LOADING_COMPLETE, () => this.#init())
  }

  #init() {
    if (this.#initialized) return
    this.#initialized = true

    this.#fadeInElements()
    this.#parallaxHero()
    this.#staggerCards()
    this.#sectionReveal()
    this.#propertyRowAnimations()
  }

  /** .js-fade-in 要素のフェードイン（staggerCards 対象グリッドの子は除外） */
  #fadeInElements() {
    const fadeEls = $$(SELECTOR.fadeIn)
    fadeEls.forEach((el) => {
      // staggerCards() で処理されるグリッド子要素はスキップ
      if (el.parentElement && el.parentElement.matches(CARD_GRIDS)) {
        return
      }
      gsap.fromTo(
        el,
        { opacity: 0, y: ANIMATION.fadeIn.y },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.fadeIn.duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }

  /**
   * ヒーローのパララックス＋テキスト出現
   * ※ hero__title / hero__subtitle / hero__search は CSS 側で opacity: 0 に設定済み
   *   ローディング完了後にチラつかず fromTo でフェードインする
   */
  #parallaxHero() {
    const hero = $(SELECTOR.hero)
    if (!hero) return

    const heroContent = $(SELECTOR.heroContent, hero)
    const heroTitle = $(SELECTOR.heroTitle, hero)
    const heroSubtitle = $(SELECTOR.heroSubtitle, hero)
    const heroSearch = $(SELECTOR.heroSearch, hero)

    // タイムラインで連携した初期アニメーション
    const tl = gsap.timeline({ delay: 0.3 })

    // 共通のイージング
    const ease = 'power3.out'

    if (heroTitle) {
      tl.fromTo(heroTitle,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease }
      )
    }
    if (heroSubtitle) {
      tl.fromTo(heroSubtitle,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease },
        '-=0.7'
      )
    }
    if (heroSearch) {
      tl.fromTo(heroSearch,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease },
        '-=0.6'
      )
    }

    // スクロールパララックス
    if (heroContent) {
      gsap.to(heroContent, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }
  }

  /** カードグリッドのスタガーアニメーション */
  #staggerCards() {
    const cardGrids = $$(CARD_GRIDS)
    cardGrids.forEach((grid) => {
      const cards = grid.children
      if (cards.length === 0) return

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION.stagger.duration,
          stagger: ANIMATION.stagger.stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }

  /** セクションタイトル下線リビール（CSS変数を操作） */
  #sectionReveal() {
    const sections = $$(SELECTOR.section)
    sections.forEach((section) => {
      const title = section.querySelector(SELECTOR.sectionTitle)
      if (!title) return

      title.style.setProperty('--underline-scale', '0')

      ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => {
          title.style.setProperty('--underline-scale', '1')
        },
        once: true,
      })
    })
  }

  /** 物件カード横型のスクロールアニメーション */
  #propertyRowAnimations() {
    const rows = $$(SELECTOR.propertyRow)
    rows.forEach((row, index) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }
}
