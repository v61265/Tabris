import UiMobFlashNews from './ui-mob-flash-news'
import UiPcFlashNews from './ui-pc-flash-news'

const flashNews = [
  {
    slug: 'mm-20230414ombuds016',
    name: '中國外交部不認對台設「禁航區」　國台辦辯稱：保障飛安慣常做法',
  },
  {
    slug: 'mm-20230706edi016',
    name: '遭PLG代理執行長周崇偉強抱性騷　啦啦隊長還原經過：當下很錯愕',
  },
  {
    slug: 'nini_test_20230617_01',
    name: 'No hero image test',
  },
  {
    slug: 'channel',
    name: '頻道位置',
  },
  {
    slug: 'adsales',
    name: '整合行銷',
  },
  {
    slug: 'webauthorization',
    name: '內容授權',
  },
  {
    slug: 'nini_test_20230509_01',
    name: '測試搜尋修復',
  },
  {
    slug: 'mm-20220127ent012',
    name: '【張鈞甯祕錄獻聲3】張鈞甯與阮經天合作《野鬼》　不受疫情影響狂接戲',
  },
]

export default function MainFlashNews() {
  console.log('hi', flashNews)
  return (
    <>
      <UiPcFlashNews flashNews={flashNews} />
      <UiMobFlashNews flashNews={flashNews} />
    </>
  )
}
