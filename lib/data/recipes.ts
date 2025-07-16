// 60개 피부 고민에 대한 레시피 데이터
export type RecipeType = {
    id: string
    title: string
    description: string
    concernId: string
    concernName: string
    skinType?: 'dry' | 'oily' | 'combination' | 'sensitive' | 'all'
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    totalTime: number
    steps: {
      id: string
      number: number
      title: string
      timeOfDay: 'morning' | 'evening' | 'both'
      duration: number
      waitTime?: number
      products: {
        type: string
        ingredient: string
        tip: string
        why: string
      }[]
    }[]
    mainIngredients: string[]
    expectedResults: {
      week: number
      effect: string
    }[]
    cautions: string[]
  }
  
  const allConcerns = Object.values(concerns).reduce<{[key: string]: any}>((acc, category) => {
    category.concerns.forEach(concern => {
      acc[concern.id] = {
        ...concern,
        category: category.name,
        categoryId: category.id,
        userCount: Math.floor(Math.random() * 1000) + 100
      }
    })
    return acc
  }, {})  export const concerns = {
    // 여드름 카테고리
    acne: {
      id: 'acne',
      name: '여드름',
      icon: '🔴',
      concerns: [
        { id: '1', name: '등드름', description: '등과 어깨 부위의 여드름' },
        { id: '2', name: '턱 여드름', description: '턱선과 입 주변의 여드름' },
        { id: '3', name: '이마 여드름', description: '이마와 헤어라인 여드름' },
        { id: '4', name: '블랙헤드', description: '코와 볼의 블랙헤드' },
        { id: '5', name: '화이트헤드', description: '작고 하얀 여드름' },
        { id: '6', name: '성인 여드름', description: '25세 이후 발생하는 여드름' },
        { id: '7', name: '가슴 여드름', description: '가슴 부위의 여드름' },
        { id: '8', name: '좁쌀 여드름', description: '작고 많은 여드름' },
        { id: '9', name: '낭포성 여드름', description: '깊고 큰 여드름' },
        { id: '10', name: '여드름 자국', description: '여드름 후 남은 자국' }
      ]
    },
    // 건조함 카테고리
    dryness: {
      id: 'dryness',
      name: '건조함',
      icon: '💧',
      concerns: [
        { id: '11', name: '극건성 피부', description: '심한 건조함과 당김' },
        { id: '12', name: '입가 건조', description: '입 주변의 건조함' },
        { id: '13', name: '눈가 건조', description: '눈 주변의 건조함' },
        { id: '14', name: '각질', description: '피부 표면의 각질' },
        { id: '15', name: '당김', description: '세안 후 당기는 느낌' },
        { id: '16', name: '건조 주름', description: '건조로 인한 잔주름' },
        { id: '17', name: '수분 부족', description: '속건조 증상' },
        { id: '18', name: '갈라짐', description: '피부 갈라짐과 트임' },
        { id: '19', name: 'T존 건조', description: 'T존 부위의 건조' },
        { id: '20', name: '계절성 건조', description: '환절기 건조함' }
      ]
    },
    // 칙칙함/색소 카테고리
    pigmentation: {
      id: 'pigmentation',
      name: '칙칙한 피부',
      icon: '☀️',
      concerns: [
        { id: '21', name: '기미', description: '얼굴의 갈색 반점' },
        { id: '22', name: '잡티', description: '작은 색소 침착' },
        { id: '23', name: '다크서클', description: '눈 밑 어두운 그늘' },
        { id: '24', name: '색소침착', description: '부분적 색소 침착' },
        { id: '25', name: '피부톤 불균형', description: '고르지 않은 피부톤' },
        { id: '26', name: '주근깨', description: '얼굴의 작은 반점들' },
        { id: '27', name: '멜라닌 과다', description: '과도한 멜라닌 생성' },
        { id: '28', name: '홍조 자국', description: '붉은 색소 침착' },
        { id: '29', name: '칙칙함', description: '전체적으로 어두운 안색' },
        { id: '30', name: '광채 부족', description: '생기없는 피부' }
      ]
    },
    // 민감성 카테고리
    sensitivity: {
      id: 'sensitivity',
      name: '민감성',
      icon: '😣',
      concerns: [
        { id: '31', name: '홍조', description: '얼굴의 붉은기' },
        { id: '32', name: '가려움', description: '피부 가려움증' },
        { id: '33', name: '따가움', description: '자극으로 인한 따가움' },
        { id: '34', name: '트러블', description: '민감성 트러블' },
        { id: '35', name: '알러지', description: '화장품 알러지' },
        { id: '36', name: '열감', description: '피부의 열감' },
        { id: '37', name: '건조 민감', description: '건조하고 민감한 피부' },
        { id: '38', name: '자극', description: '외부 자극 민감' },
        { id: '39', name: '발진', description: '피부 발진' },
        { id: '40', name: '계절 민감', description: '환절기 민감함' }
      ]
    },
    // 노화 카테고리
    aging: {
      id: 'aging',
      name: '노화',
      icon: '⏰',
      concerns: [
        { id: '41', name: '주름', description: '눈가와 이마 주름' },
        { id: '42', name: '탄력 저하', description: '피부 탄력 감소' },
        { id: '43', name: '처짐', description: '피부 처짐 현상' },
        { id: '44', name: '팔자주름', description: '입가 주름' },
        { id: '45', name: '목주름', description: '목 부위 주름' },
        { id: '46', name: '이마주름', description: '이마의 가로 주름' },
        { id: '47', name: '눈가주름', description: '눈가 잔주름' },
        { id: '48', name: '모공 늘어짐', description: '모공의 세로 늘어짐' },
        { id: '49', name: '볼륨 감소', description: '얼굴 볼륨 손실' },
        { id: '50', name: '피부 얇아짐', description: '피부 두께 감소' }
      ]
    },
    // 기타 카테고리
    other: {
      id: 'other',
      name: '기타',
      icon: '✨',
      concerns: [
        { id: '51', name: '모공', description: '넓어진 모공' },
        { id: '52', name: '피지 과다', description: '과도한 피지 분비' },
        { id: '53', name: 'T존 번들거림', description: 'T존의 유분기' },
        { id: '54', name: '묵은 각질', description: '두꺼운 각질층' },
        { id: '55', name: '피부결', description: '거친 피부결' },
        { id: '56', name: '수면 부족 피부', description: '피곤해 보이는 피부' },
        { id: '57', name: '스트레스 피부', description: '스트레스로 인한 트러블' },
        { id: '58', name: '마스크 트러블', description: '마스크 착용으로 인한 문제' },
        { id: '59', name: '화장 들뜸', description: '메이크업이 들뜨는 현상' },
        { id: '60', name: '환절기 피부', description: '계절 변화에 민감한 피부' }
      ]
    }
  }
  
  // 레시피 데이터베이스
  export const recipes: RecipeType[] = [
    // === 여드름 카테고리 레시피 ===
    
    // 1. 등드름 레시피
    {
      id: 'recipe-1-1',
      title: '살리실산 딥클렌징 루틴',
      description: '모공 속 피지와 각질을 제거하는 기본 케어',
      concernId: '1',
      concernName: '등드름',
      skinType: 'oily',
      difficulty: 'beginner',
      totalTime: 10,
      mainIngredients: ['살리실산 2%', 'BHA', '티트리'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '각질 제거 클렌징',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: '바디워시',
            ingredient: '살리실산 2% + BHA',
            tip: '미지근한 물로 충분히 거품내어 30초간 마사지',
            why: '모공 속 피지와 각질을 녹여내요'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '진정 토너',
          timeOfDay: 'both',
          duration: 2,
          waitTime: 30,
          products: [{
            type: '토너',
            ingredient: '티트리 + 위치하젤',
            tip: '화장솜보다 손으로 가볍게 두드려 흡수',
            why: '염증을 진정시키고 모공을 수렴해요'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '집중 스팟 케어',
          timeOfDay: 'evening',
          duration: 5,
          products: [{
            type: '스팟 세럼',
            ingredient: '나이아신아마이드 10%',
            tip: '트러블 부위에만 소량 발라주세요',
            why: '여드름 자국을 옅게 하고 피지 조절을 도와요'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '피부 진정, 붉은기 감소' },
        { week: 2, effect: '새로운 트러블 발생 감소' },
        { week: 4, effect: '전체적인 피부톤 개선' }
      ],
      cautions: [
        '처음 사용시 패치 테스트 필수',
        '따가움이 지속되면 사용 중단',
        '햇빛 노출 시 자외선 차단제 필수'
      ]
    },
    {
      id: 'recipe-1-2',
      title: '센텔라 수분 진정 루틴',
      description: '건조하고 민감한 등드름 피부를 위한 순한 케어',
      concernId: '1',
      concernName: '등드름',
      skinType: 'dry',
      difficulty: 'beginner',
      totalTime: 12,
      mainIngredients: ['센텔라', '판테놀', '하이알루론산'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '순한 클렌징',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '젤 클렌저',
            ingredient: 'pH 5.5 약산성 포뮬러',
            tip: '뜨거운 물 대신 미온수 사용',
            why: '피부 장벽을 보호하면서 클렌징해요'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '수분 공급',
          timeOfDay: 'both',
          duration: 3,
          waitTime: 60,
          products: [{
            type: '에센스',
            ingredient: '센텔라 70% + 하이알루론산',
            tip: '3-4번 레이어링하여 충분히 흡수',
            why: '진정과 동시에 깊은 수분을 공급해요'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '보습 마무리',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '수분 젤 크림',
            ingredient: '판테놀 5% + 마데카소사이드',
            tip: '얇게 펴 발라 끈적임 최소화',
            why: '피부 재생을 도와요'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '국소 트리트먼트',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: '스팟 패치',
            ingredient: '하이드로콜로이드 + 티트리',
            tip: '깨끗이 건조된 트러블 부위에 부착',
            why: '트러블을 보호하고 빠른 회복을 도와요'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '피부 진정, 건조함 완화' },
        { week: 2, effect: '트러블 크기 감소' },
        { week: 4, effect: '피부 장벽 강화, 재발 감소' }
      ],
      cautions: [
        '스팟 패치는 8시간 이상 부착하지 마세요',
        '알코올 프리 제품 사용 권장',
        '과도한 레이어링은 모공을 막을 수 있어요'
      ]
    },
  
    // 2. 턱 여드름 레시피
    {
      id: 'recipe-2-1',
      title: '호르몬 밸런싱 케어',
      description: '호르몬성 턱 여드름을 위한 집중 관리',
      concernId: '2',
      concernName: '턱 여드름',
      skinType: 'all',
      difficulty: 'intermediate',
      totalTime: 15,
      mainIngredients: ['아젤라익산', '녹차 추출물', '징크'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '이중 세안',
          timeOfDay: 'evening',
          duration: 5,
          products: [{
            type: '클렌징 오일 + 폼 클렌저',
            ingredient: '호호바 오일 + 녹차 추출물',
            tip: '턱선을 따라 부드럽게 마사지',
            why: '메이크업과 피지를 완벽히 제거해요'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: 'pH 밸런싱',
          timeOfDay: 'both',
          duration: 2,
          products: [{
            type: '미스트',
            ingredient: 'PHA + 프로바이오틱스',
            tip: '세안 직후 즉시 분사',
            why: '피부 pH를 정상화하고 유익균을 보충해요'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '집중 트리트먼트',
          timeOfDay: 'evening',
          duration: 3,
          waitTime: 120,
          products: [{
            type: '세럼',
            ingredient: '아젤라익산 10% + 징크',
            tip: '턱 라인을 중심으로 얇게 도포',
            why: '염증을 줄이고 피지 분비를 조절해요'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '보호막 형성',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '크림',
            ingredient: '세라마이드 + 콜레스테롤',
            tip: '목까지 연결해서 발라주세요',
            why: '피부 장벽을 강화해 외부 자극을 차단해요'
          }]
        },
        {
          id: 's5',
          number: 5,
          title: '자외선 차단',
          timeOfDay: 'morning',
          duration: 2,
          products: [{
            type: '선크림',
            ingredient: '논코메도제닉 SPF50+',
            tip: '턱 아래까지 꼼꼼히 도포',
            why: '자외선으로 인한 염증 악화를 방지해요'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '새로운 여드름 생성 감소' },
        { week: 3, effect: '기존 여드름 크기 축소' },
        { week: 6, effect: '턱선 피부결 개선' }
      ],
      cautions: [
        '생리 주기에 따라 효과가 다를 수 있어요',
        '아젤라익산은 밤에만 사용하세요',
        '인내심을 가지고 6주 이상 꾸준히 사용하세요'
      ]
    },
  
    // === 노화 카테고리 레시피 (디테일 강화) ===
    
    // 41. 주름 레시피
    {
      id: 'recipe-41-1',
      title: '레티놀 안티에이징 마스터 루틴',
      description: '검증된 레티놀로 주름을 개선하는 전문가급 케어',
      concernId: '41',
      concernName: '주름',
      skinType: 'all',
      difficulty: 'advanced',
      totalTime: 20,
      mainIngredients: ['레티놀 0.5%', '펩타이드', '비타민C'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '항산화 프렙',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: '안티옥시던트 토너',
            ingredient: '레스베라트롤 + 비타민E',
            tip: '화장솜에 충분히 적셔 피부결 정돈',
            why: '레티놀 흡수를 위한 피부 준비'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '펩타이드 부스팅',
          timeOfDay: 'both',
          duration: 3,
          waitTime: 60,
          products: [{
            type: '펩타이드 앰플',
            ingredient: '구리 펩타이드 + 마트릭실',
            tip: '눈가와 팔자 부위 집중 도포',
            why: '콜라겐 생성을 촉진하여 탄력 증진'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '레티놀 트리트먼트',
          timeOfDay: 'evening',
          duration: 5,
          waitTime: 300,
          products: [{
            type: '레티놀 세럼',
            ingredient: '캡슐화 레티놀 0.5%',
            tip: '처음엔 주 2회, 점차 늘려가세요',
            why: '세포 재생을 촉진하여 주름을 개선해요'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '집중 보습',
          timeOfDay: 'evening',
          duration: 4,
          products: [{
            type: '나이트 크림',
            ingredient: '스쿠알란 + 세라마이드 복합체',
            tip: '충분한 양으로 마사지하듯 흡수',
            why: '레티놀로 인한 건조함을 방지해요'
          }]
        },
        {
          id: 's5',
          number: 5,
          title: '아침 비타민C',
          timeOfDay: 'morning',
          duration: 3,
          products: [{
            type: '비타민C 세럼',
            ingredient: '안정화 비타민C 20%',
            tip: '레티놀 다음날 아침 필수 사용',
            why: '항산화 보호막을 형성하고 미백 효과'
          }]
        }
      ],
      expectedResults: [
        { week: 2, effect: '피부결 개선, 윤기 증가' },
        { week: 4, effect: '잔주름 완화 시작' },
        { week: 8, effect: '깊은 주름 개선, 탄력 증가' },
        { week: 12, effect: '전체적인 안티에이징 효과' }
      ],
      cautions: [
        '레티놀 사용 초기 각질, 붉은기 가능',
        '임산부는 사용 금지',
        '낮에는 반드시 SPF50+ 자외선 차단제 사용',
        '다른 활성 성분과 동시 사용 주의'
      ]
    },
    {
      id: 'recipe-41-2',
      title: '보톡스 대체 천연 주름 케어',
      description: '자연 유래 성분으로 안전하게 주름을 관리',
      concernId: '41',
      concernName: '주름',
      skinType: 'sensitive',
      difficulty: 'intermediate',
      totalTime: 15,
      mainIngredients: ['바쿠치올', '아데노신', '콜라겐'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '수분 프라이밍',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '하이드레이팅 미스트',
            ingredient: '히알루론산 8중 복합체',
            tip: '세안 후 물기 있을 때 즉시 분사',
            why: '수분 통로를 열어 흡수율을 높여요'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '식물성 레티놀',
          timeOfDay: 'evening',
          duration: 4,
          waitTime: 120,
          products: [{
            type: '바쿠치올 에센스',
            ingredient: '바쿠치올 2% + 로즈힙 오일',
            tip: '손바닥에서 따뜻하게 한 후 도포',
            why: '레티놀과 유사한 효과를 자극 없이'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '주름 필링',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '리프팅 앰플',
            ingredient: '아데노신 + EGF',
            tip: '아래에서 위로 리프팅하며 도포',
            why: '주름 부위를 타겟팅하여 개선'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '콜라겐 마스크',
          timeOfDay: 'evening',
          duration: 5,
          products: [{
            type: '바이오 셀룰로오스 마스크',
            ingredient: '저분자 콜라겐 + 엘라스틴',
            tip: '주 2-3회, 20분간 밀착 부착',
            why: '즉각적인 주름 완화와 탄력 부여'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '피부 촉촉함 증가' },
        { week: 3, effect: '표정 주름 완화' },
        { week: 6, effect: '피부 탄력도 향상' }
      ],
      cautions: [
        '바쿠치올도 감광성이 있으니 자외선 차단 필수',
        '천연 성분이라도 패치 테스트 권장',
        '즉각적인 효과보다는 꾸준함이 중요'
      ]
    },
  
    // === 미백 카테고리 레시피 (디테일 강화) ===
    
    // 21. 기미 레시피
    {
      id: 'recipe-21-1',
      title: '멜라닌 타겟 집중 미백 루틴',
      description: '기미의 근본 원인인 멜라닌을 집중 케어',
      concernId: '21',
      concernName: '기미',
      skinType: 'all',
      difficulty: 'advanced',
      totalTime: 18,
      mainIngredients: ['하이드로퀴논 대체 복합체', '트라넥삼산', '알부틴'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '각질 제거',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: 'AHA 토너',
            ingredient: '글리콜산 7% + 만델릭산',
            tip: '기미 부위 위주로 닦아내기',
            why: '묵은 각질을 제거해 미백 성분 침투 향상'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '멜라닌 억제',
          timeOfDay: 'both',
          duration: 4,
          waitTime: 180,
          products: [{
            type: '미백 부스터',
            ingredient: '트라넥삼산 5% + 나이아신아마이드 10%',
            tip: '기미 부위에 2-3번 덧발라 주세요',
            why: '멜라닌 생성 경로를 다각도로 차단'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '타겟 스팟 케어',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: '스팟 세럼',
            ingredient: '알파 알부틴 2% + 비타민C 유도체',
            tip: '면봉으로 기미 부위만 정확히 도포',
            why: '기존 색소를 분해하고 새로운 생성 방지'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '보호 & 진정',
          timeOfDay: 'both',
          duration: 4,
          products: [{
            type: '시카 크림',
            ingredient: '센텔라 + 감초 추출물',
            tip: '충분한 양으로 전체 도포',
            why: '미백 성분으로 인한 자극을 진정'
          }]
        },
        {
          id: 's5',
          number: 5,
          title: '철벽 자외선 차단',
          timeOfDay: 'morning',
          duration: 4,
          products: [{
            type: '톤업 선크림',
            ingredient: 'SPF50+ PA++++ + 산화철',
            tip: '2시간마다 덧발라주세요',
            why: '자외선은 기미의 주요 원인, 철저한 차단 필수'
          }]
        }
      ],
      expectedResults: [
        { week: 2, effect: '피부톤 밝아짐' },
        { week: 4, effect: '기미 경계 흐려짐' },
        { week: 8, effect: '기미 색소 옅어짐' },
        { week: 12, effect: '전체적인 톤 균일화' }
      ],
      cautions: [
        '미백 성분 사용 중 자외선 노출 최소화',
        '피부가 예민해질 수 있으니 보습 강화',
        '효과를 보려면 최소 3개월 꾸준히 사용',
        '임신/수유 중에는 전문가 상담 필요'
      ]
    },
    {
      id: 'recipe-21-2',
      title: 'K-뷰티 광채 미백 루틴',
      description: '한국인의 피부에 최적화된 자연스러운 미백',
      concernId: '21',
      concernName: '기미',
      skinType: 'dry',
      difficulty: 'intermediate',
      totalTime: 15,
      mainIngredients: ['갈락토미세스', '쌀 발효 추출물', '진주 가루'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '발효 클렌징',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '라이스 워터 클렌저',
            ingredient: '쌀뜨물 발효액 + 효소',
            tip: '1분간 마사지 후 미온수로 헹구기',
            why: '각질과 노폐물을 부드럽게 제거'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '퍼스트 에센스',
          timeOfDay: 'both',
          duration: 3,
          waitTime: 60,
          products: [{
            type: '갈락토미세스 에센스',
            ingredient: '갈락토미세스 95% + 나이아신아마이드',
            tip: '손바닥으로 얼굴을 감싸 흡수',
            why: '피부 재생과 미백을 동시에'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '브라이트닝 세럼',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '화이트닝 앰플',
            ingredient: '알부틴 + 감초 추출물 + 진주 가루',
            tip: '기미 부위는 한 번 더 덧발라주세요',
            why: '멜라닌 생성을 억제하고 광채 부여'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '수분 광 마스크',
          timeOfDay: 'evening',
          duration: 6,
          products: [{
            type: '하이드로겔 마스크',
            ingredient: '히알루론산 + 콜라겐 + 펄 추출물',
            tip: '주 3회, 차갑게 보관 후 사용',
            why: '즉각적인 수분 광채와 쿨링 효과'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '피부 광채 증가' },
        { week: 3, effect: '칙칙함 개선' },
        { week: 6, effect: '기미 부위 톤 개선' }
      ],
      cautions: [
        '발효 성분에 알러지가 있을 수 있어요',
        '지속적인 사용이 중요해요',
        '자외선 차단은 필수예요'
      ]
    },
  
    // 23. 다크서클 레시피
    {
      id: 'recipe-23-1',
      title: '눈가 혈액순환 집중 케어',
      description: '다크서클의 원인인 혈액순환 개선에 집중',
      concernId: '23',
      concernName: '다크서클',
      skinType: 'all',
      difficulty: 'intermediate',
      totalTime: 12,
      mainIngredients: ['카페인', '비타민K', '아르니카'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '아이 클렌징',
          timeOfDay: 'both',
          duration: 2,
          products: [{
            type: '아이 리무버',
            ingredient: '미셀라 워터 + 코튼 시드 오일',
            tip: '30초간 올려두고 부드럽게 닦아내기',
            why: '눈가 자극 없이 깨끗하게 클렌징'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '쿨링 마사지',
          timeOfDay: 'morning',
          duration: 3,
          products: [{
            type: '아이 세럼',
            ingredient: '카페인 5% + 녹차 추출물',
            tip: '메탈 팁으로 안쪽에서 바깥쪽으로 마사지',
            why: '부기를 빼고 혈액순환을 촉진'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '다크서클 타겟팅',
          timeOfDay: 'both',
          duration: 3,
          waitTime: 60,
          products: [{
            type: '아이 크림',
            ingredient: '비타민K + 레티놀 + 아르니카',
            tip: '약지로 톡톡 두드려 흡수',
            why: '색소침착과 혈관 투과를 동시에 개선'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '아이 패치',
          timeOfDay: 'evening',
          duration: 4,
          products: [{
            type: '하이드로겔 아이패치',
            ingredient: '골드 + 달팽이 점액 + 펩타이드',
            tip: '냉장 보관 후 사용하면 효과 UP',
            why: '집중 영양 공급과 즉각적인 개선'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '눈가 부기 감소' },
        { week: 2, effect: '다크서클 밝아짐' },
        { week: 4, effect: '눈가 탄력 개선' }
      ],
      cautions: [
        '눈에 들어가지 않도록 주의',
        '너무 가까이 바르면 눈 자극 가능',
        '레티놀 함유 제품은 낮 사용 금지'
      ]
    },
  
    // === 건조함 카테고리 레시피 ===
    
    // 11. 극건성 피부 레시피
    {
      id: 'recipe-11-1',
      title: '7스킨 메소드 수분 폭탄',
      description: '극건성 피부를 위한 K-뷰티 대표 보습법',
      concernId: '11',
      concernName: '극건성 피부',
      skinType: 'dry',
      difficulty: 'intermediate',
      totalTime: 15,
      mainIngredients: ['히알루론산', '세라마이드', '스쿠알란'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '보습 클렌징',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '밀크 클렌저',
            ingredient: '시어버터 + 오트밀 추출물',
            tip: '마사지하듯 부드럽게, 미온수로 헹구기',
            why: '피부 유수분을 보호하며 클렌징'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '7스킨 레이어링',
          timeOfDay: 'both',
          duration: 7,
          waitTime: 30,
          products: [{
            type: '하이드레이팅 토너',
            ingredient: '히알루론산 7종 + 판테놀',
            tip: '한 번에 소량씩 7번 반복 레이어링',
            why: '피부 깊숙이 수분을 차곡차곡 채워요'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '오일 부스팅',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: '페이셜 오일',
            ingredient: '스쿠알란 + 호호바 오일',
            tip: '크림에 2-3방울 섞어 사용',
            why: '수분 증발을 막고 윤기를 더해요'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '수분 봉인',
          timeOfDay: 'both',
          duration: 2,
          products: [{
            type: '세라마이드 크림',
            ingredient: '세라마이드 3종 + 콜레스테롤',
            tip: '피부를 누르듯 꼼꼼히 도포',
            why: '수분을 가두고 장벽을 강화해요'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '즉각적인 수분감 상승' },
        { week: 2, effect: '각질 감소, 피부결 개선' },
        { week: 4, effect: '피부 장벽 강화로 건조함 근본 개선' }
      ],
      cautions: [
        '7스킨은 피부 상태에 따라 3-5회로 조절 가능',
        '너무 많은 레이어링은 모공을 막을 수 있어요',
        '계절에 따라 횟수 조절 필요'
      ]
    },
  
    // === 민감성 카테고리 레시피 ===
    
    // 31. 홍조 레시피
    {
      id: 'recipe-31-1',
      title: '진정 쿨링 SOS 루틴',
      description: '붉어진 피부를 빠르게 진정시키는 응급 케어',
      concernId: '31',
      concernName: '홍조',
      skinType: 'sensitive',
      difficulty: 'beginner',
      totalTime: 10,
      mainIngredients: ['센텔라', '알로에', '아줄렌'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '쿨 클렌징',
          timeOfDay: 'both',
          duration: 2,
          products: [{
            type: '저자극 젤 클렌저',
            ingredient: 'pH 5.5 + 무향료',
            tip: '찬물로 마무리하여 모공 수축',
            why: '자극 없이 노폐물만 제거'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '즉각 진정',
          timeOfDay: 'both',
          duration: 3,
          products: [{
            type: '카밍 미스트',
            ingredient: '온천수 + 알로에 베라',
            tip: '냉장 보관 후 사용하면 효과 2배',
            why: '즉각적인 쿨링과 진정 효과'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '집중 진정',
          timeOfDay: 'both',
          duration: 3,
          waitTime: 60,
          products: [{
            type: '시카 세럼',
            ingredient: '센텔라 85% + 아줄렌',
            tip: '홍조 부위에 두껍게 레이어링',
            why: '염증을 가라앉히고 재생 촉진'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '보호막 형성',
          timeOfDay: 'both',
          duration: 2,
          products: [{
            type: '라이트 젤 크림',
            ingredient: '판테놀 5% + 마데카소사이드',
            tip: '얇게 여러 번 덧발라주세요',
            why: '외부 자극으로부터 피부 보호'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '홍조 빈도 감소' },
        { week: 2, effect: '피부 진정, 편안함 증가' },
        { week: 4, effect: '피부 저항력 향상' }
      ],
      cautions: [
        '뜨거운 물, 사우나 피하기',
        '알코올, 향료 함유 제품 사용 금지',
        '자극적인 음식 섭취 주의'
      ]
    },
  
    // === 기타 카테고리 레시피 ===
    
    // 51. 모공 레시피
    {
      id: 'recipe-51-1',
      title: '모공 타이트닝 집중 관리',
      description: '늘어진 모공을 탄탄하게 조여주는 케어',
      concernId: '51',
      concernName: '모공',
      skinType: 'oily',
      difficulty: 'intermediate',
      totalTime: 12,
      mainIngredients: ['BHA', '나이아신아마이드', '클레이'],
      steps: [
        {
          id: 's1',
          number: 1,
          title: '딥 클렌징',
          timeOfDay: 'evening',
          duration: 3,
          products: [{
            type: '클렌징 밤',
            ingredient: '살리실산 0.5% + 티트리',
            tip: '모공 부위 집중 마사지',
            why: '모공 속 피지와 노폐물 제거'
          }]
        },
        {
          id: 's2',
          number: 2,
          title: '모공 수렴',
          timeOfDay: 'both',
          duration: 2,
          products: [{
            type: '포어 토너',
            ingredient: 'BHA + 위치하젤',
            tip: '화장솜으로 T존 위주 닦아내기',
            why: '각질 제거와 모공 수축 효과'
          }]
        },
        {
          id: 's3',
          number: 3,
          title: '모공 축소',
          timeOfDay: 'both',
          duration: 3,
          waitTime: 120,
          products: [{
            type: '포어 세럼',
            ingredient: '나이아신아마이드 20% + 아연',
            tip: '모공이 넓은 부위 집중 도포',
            why: '피지 조절과 모공 축소'
          }]
        },
        {
          id: 's4',
          number: 4,
          title: '주간 스페셜',
          timeOfDay: 'evening',
          duration: 4,
          products: [{
            type: '클레이 마스크',
            ingredient: '카올린 + 벤토나이트',
            tip: '주 2회, T존 위주로 10분간',
            why: '모공 속 노폐물을 흡착 제거'
          }]
        }
      ],
      expectedResults: [
        { week: 1, effect: '모공 속 깨끗해짐' },
        { week: 2, effect: '모공 크기 감소' },
        { week: 4, effect: '매끈한 피부결' }
      ],
      cautions: [
        'BHA는 자외선 민감도를 높일 수 있어요',
        '클레이 마스크 후 충분한 보습 필수',
        '과도한 사용은 오히려 피지 분비 증가'
      ]
    }
    
    // ... 나머지 50개 이상의 레시피들도 같은 형식으로 계속 추가
  ]
  
  // 고민별 레시피 매칭 함수
  export function getRecipesByConcern(concernId: string): RecipeType[] {
    return recipes.filter(recipe => recipe.concernId === concernId)
  }
  
  // 피부 타입별 레시피 필터링
  export function getRecipesBySkinType(recipes: RecipeType[], skinType: string): RecipeType[] {
    return recipes.filter(recipe => 
      recipe.skinType === 'all' || recipe.skinType === skinType
    )
  }
  
  // 난이도별 레시피 필터링
  export function getRecipesByDifficulty(recipes: RecipeType[], difficulty: string): RecipeType[] {
    return recipes.filter(recipe => recipe.difficulty === difficulty)
  }
  