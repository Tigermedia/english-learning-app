# English Learning App - Optimized Prompt

Use this prompt with Claude or any AI assistant to build the app.

---

## Role & Expertise
Adopt the persona of a senior full-stack developer with expertise in:
- Child educational app development (ages 6-10)
- Second language acquisition (L2) pedagogy
- Gamification and engagement design for children
- Hebrew RTL interface design

## Context & Purpose
I'm building an English learning web app for my 8-year-old Hebrew-speaking daughter. She has zero English knowledge. The app will be her primary tool for learning basic English vocabulary and simple sentences at home.

**Why this matters:** She needs a fun, non-intimidating way to start learning English before formal school instruction. The Hebrew interface is critical so she can navigate independently without adult help.

## Reference Model
Base the UX/mechanics on this cognitive training app: https://mindmeld-trainer-49.lovable.app/

Key patterns to replicate:
1. **Setup screen**: Category selection, difficulty level, session duration
2. **Learning phase**: Show content with countdown timer for memorization/study
3. **Question phase**: Multiple-choice questions to test understanding
4. **Gamification**: XP points, levels/ranks, progress tracking
5. **Hebrew RTL interface** with clear, child-friendly typography

## Requirements

### Must Have (MVP)
- [ ] Hebrew interface throughout (RTL layout)
- [ ] 5 learning categories: Colors, Animals, Numbers (1-20), Family, Food
- [ ] Each category: 10-15 vocabulary words with images
- [ ] Question types: Image-to-word matching, Word-to-image matching, Audio recognition
- [ ] Audio pronunciation for all English words (using Web Speech API or similar)
- [ ] 3 difficulty levels affecting: timer speed, number of answer options, hints
- [ ] Session duration options: 2, 5, 10 minutes
- [ ] XP/points system with visual rewards (stars, badges)
- [ ] Progress saving (localStorage or simple backend)
- [ ] Mobile-responsive design (she uses a tablet)

### Should NOT Include
- No typing/spelling exercises (too advanced for age 8 beginner)
- No grammar rules or explanations
- No user accounts or authentication (single-user family device)
- No ads or external links
- No punishment mechanics (only positive reinforcement)

## Technical Constraints
- **Stack**: React + TypeScript + Tailwind CSS (or similar modern stack)
- **Deployment**: Vercel or similar static hosting
- **No backend required** for MVP (localStorage for progress)
- **Assets**: Use free image APIs or include placeholder system

## Deliverables

Think step by step and provide:

### Phase 1: Architecture Plan
1. Component hierarchy diagram (text-based)
2. Data model for vocabulary, categories, progress
3. State management approach
4. File/folder structure

### Phase 2: Implementation Roadmap
Ordered list of implementation tasks with dependencies

### Phase 3: Core Code
Start with these critical components:
1. Main app shell with Hebrew RTL layout
2. Category selection screen
3. Learning/memorization screen with timer
4. Question screen with multiple choice
5. XP/progress tracking system

## Output Format
For each phase, use this structure:

```
### [Phase Name]
**Goal:** [One sentence]

**Deliverables:**
- [Bullet list]

**Code:** (where applicable)
// Well-commented code with Hebrew UI strings
```

## Quality Checks
Before finalizing, critique your own response:
- Is the Hebrew text accurate and child-appropriate?
- Are the vocabulary words age-appropriate for 8-year-olds?
- Does the gamification motivate without frustrating?
- Is the UI simple enough for a child to use independently?

## Research to Incorporate
Base vocabulary selection and learning patterns on:
- Common first English words for Hebrew speakers
- Spaced repetition principles (simplified for children)
- Duolingo/Lingokids engagement patterns for young learners