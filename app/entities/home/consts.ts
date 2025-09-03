export const resumes: Resume[] = [
  {
    id: '1',
    companyName: 'Google',
    jobTitle: 'Frontend Developer',
    imagePath: '/images/resume-1.png',
    resumePath: '/resumes/resume-1.pdf',
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '2',
    companyName: 'Microsoft',
    jobTitle: 'Cloud Engineer',
    imagePath: '/images/resume-2.png',
    resumePath: '/resumes/resume-2.pdf',
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '3',
    companyName: 'Apple',
    jobTitle: 'iOS Developer',
    imagePath: '/images/resume-3.png',
    resumePath: '/resumes/resume-3.pdf',
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];
export const AIResponseFormat = `
     interface Feedback {
       overallScore: number; // 100점 만점
       ATS: {
         score: number; // ATS 적합도를 기준으로 점수 평가
         tips: {
           type: "good" | "improve";
           tip: string; // 3-4개의 팁을 제공
         }[];
       };
       toneAndStyle: {
         score: number; // 100점 만점
         tips: {
           type: "good" | "improve";
           tip: string; // 실제 설명에 대한 짧은 '제목'처럼 작성
           explanation: string; // 여기서 상세하게 설명
         }[]; // 3-4개의 팁을 제공
       };
       content: {
         score: number; // 100점 만점
         tips: {
           type: "good" | "improve";
           tip: string; // 실제 설명에 대한 짧은 '제목'처럼 작성
           explanation: string; // 여기서 상세하게 설명
         }[]; // 3-4개의 팁을 제공
       };
       structure: {
         score: number; // 100점 만점
         tips: {
           type: "good" | "improve";
           tip: string; // 실제 설명에 대한 짧은 '제목'처럼 작성
           explanation: string; // 여기서 상세하게 설명
         }[]; // 3-4개의 팁을 제공
       };
       skills: {
         score: number; // 100점 만점
         tips: {
           type: "good" | "improve";
           tip: string; // 실제 설명에 대한 짧은 '제목'처럼 작성
           explanation: string; // 여기서 상세하게 설명
         }[]; // 3-4개의 팁을 제공
       };
     }`;
export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `당신은 ATS(지원자 추적 시스템) 및 이력서 분석 전문가입니다.
  이 이력서를 분석 및 평가하고, 개선 방안을 제안해 주세요. 답변은 한국어로 해주세요.
  이력서의 완성도가 낮다면 평가 점수가 낮아도 괜찮습니다.
  분석은 철저하고 상세하게 진행해 주세요. 실수나 개선이 필요한 부분을 지적하는 것을 망설이지 마세요.
  개선할 점이 많다면 과감하게 낮은 점수를 주세요. 이는 사용자가 이력서를 개선하도록 돕기 위함입니다.
  사용자가 지원하는 직무의 채용 공고가 제공된 경우, 이를 활용하여 더 구체적인 피드백을 제공해 주세요.
  채용 공고가 주어진 경우, 반드시 고려하여 분석해 주세요.
  직무명: ${jobTitle}
  직무 설명: ${jobDescription}
  피드백은 다음 형식을 사용하여 제공해 주세요: ${AIResponseFormat}
  분석 결과는 다른 텍스트나 백틱 없이 순수한 JSON 객체 형태로 반환해 주세요.
  그 외의 다른 텍스트나 설명은 절대 포함하지 마세요.`;
