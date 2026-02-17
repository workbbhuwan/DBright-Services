export const frontPage = {
  hero: {
    headline: '株式会社D.Bright\n確かな技術と信頼で輝く空間を',
    subtitle:
      '株式会社D.Brightは、経験豊富なプロフェッショナルが\n厳格な品質基準のもと最高の清掃サービスをご提供いたします。',
    ctaPrimary: 'お問い合わせ',
    ctaSecondary: 'サービスを見る',
  },
  intro: {
    badge: '私たちについて',
    headlineSegments: [
      '株式会社D.Brightは経験と信頼で確かな成果を届ける',
      'プロチーム。一貫した品質とお客様第一の',
      'サービスをお届けします。',
    ],
    stats: [
      { label: '完了済み', value: 500, suffix: '+', description: 'プロジェクト実績' },
      { label: '満足度', value: 98, suffix: '%', description: '顧客満足度' },
    ],
  },
  services: {
    title: '提供サービス',
    items: [
      {
        num: '01',
        title: 'ホーム清掃',
        tags: ['エコ素材', '家族安心', '定期清掃', '研修済み'],
        showTags: true,
        image: '/service-page/home-cleaning.png',
      },
      { num: '02', title: 'オフィス清掃', tags: [], showTags: false, image: '/service-page/office-cleaning.png' },
      {
        num: '03',
        title: 'ディープクリーニング',
        tags: [],
        showTags: false,
        image: '/service-page/deep-cleaning.png',
      },
      { num: '04', title: '窓ガラス清掃', tags: [], showTags: false, image: '/service-page/window-cleaning.png' },
    ],
  },
  whyChooseUs: {
    badge: '選ばれる理由',
    title: '株式会社D.Brightが\n選ばれる理由',
    reasons: [
      {
        title: 'プロの訓練されたスタッフ',
        description:
          '厳しい研修を受けたスタッフが、常に高品質で一貫したサービスをお届けします。',
      },
      {
        title: '安心・安全なクリーニング製品',
        description:
          '環境に優しい無毒な素材を使用し、ご家族やペット、環境を守ります。',
      },
      {
        title: '迅速で柔軟なスケジューリング',
        description:
          'ご都合に合わせた時間帯を選び、オンラインで即座に予約・変更が可能です。',
      },
      {
        title: '品質保証',
        description:
          '卓越したクリーニング品質を保証し、ご期待に添えない場合は無償で対応いたします。',
      },
    ],
  },
};
