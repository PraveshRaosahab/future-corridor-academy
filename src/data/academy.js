/**
 * The Future Corridor - Course & Institute Data
 * Important: Missing business facts (fees, batch duration, certifications)
 * are maintained as clearly marked editable placeholders.
 */

export const academyData = {
  instituteName: 'The Future Corridor',
  category: 'Language Training & Teacher Training Institute',
  headline: 'Build Your Future With The Right Skills',
  subheadline: 'From IELTS and Spoken English to professional teacher & childcare training — every course is available Online and Offline.',

  courseGroups: [
    {
      id: 'language',
      title: 'Language & Communication Courses',
      description: 'Structured English language training to build fluency, confidence, and exam readiness.',
      courses: [
        {
          id: 'ielts',
          code: 'IELTS',
          name: 'IELTS Coaching',
          summary: 'Focused preparation covering Listening, Reading, Writing, and Speaking modules for the IELTS exam.',
          duration: '[Duration - 2 to 4 months]',
          mode: 'Online / Offline'
        },
        {
          id: 'spoken-english',
          code: 'Spoken English',
          name: 'Spoken English',
          summary: 'Practical speaking practice designed to build day-to-day conversational fluency and confidence.',
          duration: '[Duration - 2 to 3 months]',
          mode: 'Online / Offline'
        },
        {
          id: 'english-grammar',
          code: 'Grammar',
          name: 'English Grammar',
          summary: 'A strong grammar foundation covering sentence structure, tenses, and correct usage.',
          duration: '[Duration - 1 to 2 months]',
          mode: 'Online / Offline'
        }
      ]
    },
    {
      id: 'skill-based',
      title: 'Skill-Based Courses',
      description: 'Accredited-style training for aspiring teachers, early educators, and childcare professionals.',
      courses: [
        {
          id: 'ntt',
          code: 'NTT',
          name: 'Nursery Teacher Training',
          summary: 'Pedagogical training focused on nursery teaching methods, child psychology, and classroom management.',
          duration: '[Duration - 6 to 12 months]',
          mode: 'Online / Offline'
        },
        {
          id: 'ptt',
          code: 'PTT',
          name: 'Primary Teacher Training',
          summary: 'Teaching methodologies, curriculum planning, and instructional techniques for primary school educators.',
          duration: '[Duration - 1 year]',
          mode: 'Online / Offline'
        },
        {
          id: 'nanny',
          code: 'Nanny',
          name: 'Nanny Course',
          summary: 'Practical child caregiving, safety protocols, and home management skills for professional nannies.',
          duration: '[Duration - 6 months to 1 year]',
          mode: 'Online / Offline'
        },
        {
          id: 'ecce',
          code: 'ECCE',
          name: 'Early Childhood Care Education',
          summary: 'A holistic foundation in early childhood learning environments, child nutrition, and behavioral guidance.',
          duration: '[Duration - 6 to 12 months]',
          mode: 'Online / Offline'
        }
      ]
    }
  ],

  whyChooseUs: [
    {
      id: 'language-focus',
      title: 'Focused Language Training',
      description: 'Dedicated IELTS, Spoken English, and Grammar batches built around real exam and conversational needs.'
    },
    {
      id: 'practical-focus',
      title: 'Practical Teaching Methodology',
      description: 'Hands-on lesson planning, mock classroom sessions, and teaching aid creation to build real-world confidence.'
    },
    {
      id: 'flexible-mode',
      title: 'Online & Offline Flexibility',
      description: 'Every course is available both online and in the classroom, so you can learn in the way that suits you.'
    },
    {
      id: 'career-guidance',
      title: 'Career & Interview Preparation',
      description: 'Resume building, demo class preparation, and guidance for teaching and childcare career opportunities.'
    }
  ]
};
