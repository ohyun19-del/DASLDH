import { TransportItem, QuizQuestion, ScenarioQuestion } from '../types';

export const INITIAL_TRANSPORT_ITEMS: TransportItem[] = [
  {
    id: 't1',
    name: '가마',
    era: '옛날',
    domain: '땅',
    powerSource: '사람의 힘 (가마꾼)',
    iconName: 'Users',
    description: '사람들이 어깨에 메고 나르는 옛날의 고급 교통수단이에요.'
  },
  {
    id: 't2',
    name: '고속열차 (KTX)',
    era: '오늘날',
    domain: '땅',
    powerSource: '전기 에너지',
    iconName: 'Train',
    description: '시속 300km가 넘는 빠른 속도로 전국을 반나절 생활권으로 연결해요.'
  },
  {
    id: 't3',
    name: '뗏목 / 나룻배',
    era: '옛날',
    domain: '바다',
    powerSource: '노 젓는 힘 / 강물의 흐름',
    iconName: 'Ship',
    description: '통나무나 갈대를 엮어 강이나 얕은 물을 건넜어요.'
  },
  {
    id: 't4',
    name: '비행기',
    era: '오늘날',
    domain: '하늘',
    powerSource: '제트 엔진 (항공유)',
    iconName: 'Plane',
    description: '먼 바다와 대륙을 건너 전 세계를 빠르게 오갈 수 있어요.'
  },
  {
    id: 't5',
    name: '소달구지',
    era: '옛날',
    domain: '땅',
    powerSource: '소의 힘',
    iconName: 'Footprints',
    description: '소가 수레를 끌어 무거운 곡식이나 짐을 날랐어요.'
  },
  {
    id: 't6',
    name: '친환경 전기버스',
    era: '오늘날',
    domain: '땅',
    powerSource: '배터리 / 전기',
    iconName: 'Bus',
    description: '매연이 나오지 않고 많은 시민들이 함께 타는 대중교통이에요.'
  },
  {
    id: 't7',
    name: '돛단배 (황포돛배)',
    era: '옛날',
    domain: '바다',
    powerSource: '바람의 힘 (자연)',
    iconName: 'Wind',
    description: '바람을 이용해 큰 강이나 바다를 누비며 물건을 실어 날랐어요.'
  },
  {
    id: 't8',
    name: '컨테이너 대형 화물선',
    era: '오늘날',
    domain: '바다',
    powerSource: '대형 선박 엔진',
    iconName: 'Anchor',
    description: '수천 개의 컨테이너를 싣고 세계 여러 나라로 수출·수입품을 날라요.'
  }
];

export const TIMELINE_DATA = [
  {
    step: 1,
    period: '원시 ~ 삼국시대 이전',
    title: '자신의 두 발과 지게',
    power: '사람의 근육 힘',
    features: '먼 거리를 가려면 며칠에서 몇 달이 걸렸고, 무거운 짐을 들기 어려웠어요.',
    icon: 'Footprints'
  },
  {
    step: 2,
    period: '조선시대 등 옛날',
    title: '말, 소달구지, 가마, 돛단배',
    power: '가축의 힘 & 자연(바람, 물)의 힘',
    features: '사람의 발보다 힘이 세졌지만 날씨의 영향을 많이 받고 쉬어야 했어요.',
    icon: 'Horse'
  },
  {
    step: 3,
    period: '근대 (증기기관 발명)',
    title: '증기선과 증기기관차',
    power: '석탄과 증기의 힘 (기계)',
    features: '비나 눈이 와도 지치지 않고 빠르게 많은 사람과 물건을 나르기 시작했어요.',
    icon: 'Flame'
  },
  {
    step: 4,
    period: '현대 (오늘날)',
    title: '자동차, 고속철도, 비행기',
    power: '석유 엔진 및 전기 모터',
    features: '전 세계가 하루 만에 닿는 "일일생활권"이 되었고, 이동이 매우 편리해졌어요.',
    icon: 'Zap'
  },
  {
    step: 5,
    period: '미래 사회',
    title: '자율주행차, UAM(도심항공교통), 하이퍼루프',
    power: '수소, 태양광, 인공지능 자율운항',
    features: '매연이 전혀 없고 교통 체증 없이 하늘과 진공 튜브로 초고속 이동해요.',
    icon: 'Sparkles'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '옛날의 교통수단은 주로 사람의 힘, 가축(말·소)의 힘, 또는 바람과 같은 자연의 힘을 이용했다.',
    type: 'OX',
    correctAnswer: 'O',
    explanation: '맞아요! 옛날에는 엔진이나 전기가 없어 사람의 다리, 말, 소, 바람 등을 이용했어요.'
  },
  {
    id: 2,
    question: '오늘날 교통수단이 발달하면서 서울에서 부산까지 이동하는 시간이 옛날보다 훨씬 늘어났다.',
    type: 'OX',
    correctAnswer: 'X',
    explanation: '틀려요! KTX나 고속도로 덕분에 옛날에 며칠씩 걸리던 길이 2시간대로 훨씬 줄어들었어요.'
  },
  {
    id: 3,
    question: '교통수단이 발달하면서 생겨난 문제점이 아닌 것은 무엇일까요?',
    type: 'CHOICE',
    options: [
      '자동차 매연으로 인한 공기 오염',
      '도로에 차가 막히는 교통 체증',
      '다른 지역과의 교류가 늘어남',
      '교통사고 위험과 자동차 소음'
    ],
    correctAnswer: '다른 지역과의 교류가 늘어남',
    explanation: '다른 지역과의 교류가 늘어난 것은 교통수단 발달의 "좋은 점(장점)"이에요!'
  },
  {
    id: 4,
    question: '교통수단이 발달하여 지구촌 어디든지 하루 만에 오갈 수 있게 된 생활권을 무엇이라고 부를까요?',
    type: 'CHOSUNG',
    chosungHint: 'ㅇ ㅇ ㅅ ㅎ ㄱ',
    correctAnswer: '일일생활권',
    explanation: '하루(일일) 안에 일상적인 생활이나 왕복 이동이 가능한 권역을 "일일생활권"이라고 해요.'
  }
];

export const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 1,
    situation: '내일 아침까지 서울에서 멀리 떨어진 제주도에 급한 서류를 직접 들고 가야 해요.',
    targetEra: '오늘날',
    suggestedAnswers: ['비행기', '항공기'],
    sampleReason: '바다를 건너 가장 빠르고 안전하게 갈 수 있기 때문입니다.',
    icon: 'Plane'
  },
  {
    id: 2,
    situation: '우리나라 공장에서 정성껏 만든 자동차 1,500대를 멀리 미국으로 수출하려고 해요.',
    targetEra: '오늘날',
    suggestedAnswers: ['화물선', '컨테이너선', '대형선박', '배'],
    sampleReason: '비행기보다 훨씬 크고 많은 양의 무거운 짐을 한꺼번에 경제적으로 실어 나를 수 있기 때문입니다.',
    icon: 'Ship'
  },
  {
    id: 3,
    situation: '출근 시간 복잡한 도심에서 도로 정체 없이 약속 시간에 정확하게 이동하고 싶어요.',
    targetEra: '오늘날',
    suggestedAnswers: ['지하철', '전철'],
    sampleReason: '지하 레일을 따라 신호 대기나 교통 체증 없이 정해진 시간에 정확히 도착하기 때문입니다.',
    icon: 'Train'
  }
];

export const FUTURE_INSPIRATIONS = [
  { name: '스카이 에코 택시', tag: '하늘 / UAM', desc: '태양광과 수소로 날아다니는 4인승 자율비행 에어택시' },
  { name: '돌고래 해저 특급', tag: '바다 / 해저', desc: '물속을 돌고래처럼 헤엄치며 섬과 육지를 잇는 수중 고속열차' },
  { name: '하이퍼루프 튜브캡슐', tag: '땅 / 진공', desc: '공기 저항 없는 진공관 속을 음속(시속 1,200km)으로 달리는 캡슐' },
  { name: '태양광 변신 스쿠터', tag: '개인용 / 친환경', desc: '접어서 가방에 넣고 다니며 어디서든 충전되는 1인 모빌리티' }
];
