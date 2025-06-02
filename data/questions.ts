import { Question, Category } from '@/types/quiz';

export const categories: Category[] = [
  {
    id: 'cell-biology',
    name: '細胞生物学',
    description: '細胞の構造と機能について学習',
    icon: '🔬',
    questionCount: 10
  },
  {
    id: 'molecular-biology',
    name: '分子生物学',
    description: 'DNA、RNA、タンパク質の分子レベルでの理解',
    icon: '🧬',
    questionCount: 12
  },
  {
    id: 'genetics',
    name: '遺伝学',
    description: '遺伝の法則と遺伝子発現の制御',
    icon: '🧮',
    questionCount: 8
  },
  {
    id: 'biochemistry',
    name: '生化学',
    description: '代謝経路と酵素反応',
    icon: '⚗️',
    questionCount: 10
  },
  {
    id: 'evolution',
    name: '進化生物学',
    description: '生物の進化と系統関係',
    icon: '🦕',
    questionCount: 6
  }
];

export const questions: Question[] = [
  // 細胞生物学
  {
    id: 'cell-1',
    category: 'cell-biology',
    question: 'ミトコンドリアの内膜で行われる主要な過程は何ですか？',
    options: [
      '解糖系',
      '電子伝達系とATP合成',
      'クエン酸回路',
      'β酸化'
    ],
    correctAnswer: 1,
    explanation: 'ミトコンドリアの内膜では電子伝達系が行われ、プロトン勾配を利用してATPが合成されます。これは酸化的リン酸化の過程です。',
    difficulty: 'medium'
  },
  {
    id: 'cell-2',
    category: 'cell-biology',
    question: '小胞体（ER）の機能として正しくないものはどれですか？',
    options: [
      'タンパク質の合成と修飾',
      'lipidの合成',
      'DNA複製',
      'カルシウムイオンの貯蔵'
    ],
    correctAnswer: 2,
    explanation: 'DNA複製は核で行われる過程であり、小胞体の機能ではありません。小胞体はタンパク質やlipidの合成、カルシウム貯蔵などを行います。',
    difficulty: 'easy'
  },
  {
    id: 'cell-3',
    category: 'cell-biology',
    question: 'ゴルジ体の主要な機能は何ですか？',
    options: [
      'DNA合成',
      'タンパク質の修飾と輸送',
      'ATP合成',
      'RNA合成'
    ],
    correctAnswer: 1,
    explanation: 'ゴルジ体は小胞体で合成されたタンパク質を受け取り、糖鎖修飾などの後修飾を行い、最終目的地へ輸送する役割を担います。',
    difficulty: 'medium'
  },

  // 分子生物学
  {
    id: 'mol-1',
    category: 'molecular-biology',
    question: 'DNAの二重らせん構造において、アデニンと結合する塩基は何ですか？',
    options: [
      'グアニン',
      'チミン',
      'シトシン',
      'ウラシル'
    ],
    correctAnswer: 1,
    explanation: 'DNAにおいて、アデニン（A）はチミン（T）と2つの水素結合で結合します。これはChargaffの法則の一部です。',
    difficulty: 'easy'
  },
  {
    id: 'mol-2',
    category: 'molecular-biology',
    question: 'mRNAのスプライシングが行われる場所はどこですか？',
    options: [
      '細胞質',
      '核',
      'ミトコンドリア',
      'リボソーム'
    ],
    correctAnswer: 1,
    explanation: 'スプライシングは転写後修飾の一つで、核内でpre-mRNAからイントロンが除去され、エクソンが結合される過程です。',
    difficulty: 'medium'
  },
  {
    id: 'mol-3',
    category: 'molecular-biology',
    question: 'リボソームの大サブユニットと小サブユニットの沈降係数は？（真核生物）',
    options: [
      '30Sと50S',
      '40Sと60S',
      '70Sと80S',
      '80Sと100S'
    ],
    correctAnswer: 1,
    explanation: '真核生物のリボソームは80Sで、40S（小サブユニット）と60S（大サブユニット）から構成されます。原核生物は70S（30S+50S）です。',
    difficulty: 'hard'
  },

  // 遺伝学
  {
    id: 'gen-1',
    category: 'genetics',
    question: 'メンデルの法則において、F1世代で表現型が隠される遺伝子を何と呼びますか？',
    options: [
      '優性遺伝子',
      '劣性遺伝子',
      '共優性遺伝子',
      '致死遺伝子'
    ],
    correctAnswer: 1,
    explanation: '劣性遺伝子は、優性遺伝子と一緒に存在すると表現型として現れない遺伝子です。ホモ接合体（aa）の時のみ表現されます。',
    difficulty: 'easy'
  },
  {
    id: 'gen-2',
    category: 'genetics',
    question: 'オペロンモデルにおいて、リプレッサーが結合する部位を何と呼びますか？',
    options: [
      'プロモーター',
      'オペレーター',
      'ターミネーター',
      'エンハンサー'
    ],
    correctAnswer: 1,
    explanation: 'オペレーターはリプレッサータンパク質が結合する部位で、転写の開始を阻害する役割を果たします。',
    difficulty: 'medium'
  },

  // 生化学
  {
    id: 'bio-1',
    category: 'biochemistry',
    question: '解糖系において、1分子のグルコースから何分子のATPが直接合成されますか？',
    options: [
      '1分子',
      '2分子',
      '4分子',
      '6分子'
    ],
    correctAnswer: 1,
    explanation: '解糖系では、基質レベルリン酸化により2分子のATPが直接合成されます（4分子生成、2分子消費）。',
    difficulty: 'medium'
  },
  {
    id: 'bio-2',
    category: 'biochemistry',
    question: 'クエン酸回路が行われる細胞内小器官はどこですか？',
    options: [
      '細胞質',
      'ミトコンドリアマトリックス',
      '核',
      '小胞体'
    ],
    correctAnswer: 1,
    explanation: 'クエン酸回路（TCA回路）はミトコンドリアのマトリックス内で行われ、アセチルCoAを完全酸化してCO2、NADH、FADH2、ATPを生成します。',
    difficulty: 'easy'
  },

  // 進化生物学
  {
    id: 'evo-1',
    category: 'evolution',
    question: 'ダーウィンの自然選択説の基本原理に含まれないものはどれですか？',
    options: [
      '変異',
      '遺伝',
      '生存競争',
      '獲得形質の遺伝'
    ],
    correctAnswer: 3,
    explanation: '獲得形質の遺伝はラマルクの説で、ダーウィンの自然選択説には含まれません。自然選択説は変異、遺伝、生存競争が基本原理です。',
    difficulty: 'medium'
  },
  {
    id: 'evo-2',
    category: 'evolution',
    question: '分子時計の原理として正しいものはどれですか？',
    options: [
      'DNA変異は一定の速度で蓄積される',
      'タンパク質は一定の速度で分解される',
      '細胞分裂は一定の間隔で起こる',
      '代謝速度は一定である'
    ],
    correctAnswer: 0,
    explanation: '分子時計は、DNA配列やタンパク質配列の変異が時間と共に一定の速度で蓄積されるという仮定に基づいて、種の分岐時期を推定する手法です。',
    difficulty: 'hard'
  }
]; 