import { IconNames } from './icon.type'

enum SkillLevel {
  EXPERT = 'expert',
  ADVANCED = 'advanced',
  WORKING = 'working',
}
type SkillType = {
  name: string
  level: SkillLevel
  items: { title: string; icon?: IconNames }[]
}
export const SKILLS: SkillType[] = [
  {
    name: 'Frontend Engineering',
    level: SkillLevel.EXPERT,
    items: [
      { title: 'React.js, React Native, Next.js', icon: 'react' },
      { title: 'TypeScript, JavaScript (ES6+)', icon: 'typescript' },
      { title: 'State management (Redux, Zustand)', icon: 'zustand' },
      { title: 'UI/UX implementation', icon: 'layers' },
      { title: 'Performance Optimization', icon: 'optimization' },
    ],
  },
  {
    name: 'Web & App Development',
    level: SkillLevel.EXPERT,
    items: [
      { title: 'RESTful API integration', icon: 'connection' },
      { title: 'dApp development', icon: 'dapp' },
      { title: 'Web3.js, Ethers.js', icon: 'eth' },
      { title: 'Expo', icon: 'expo' },
      { title: 'Chrome Extension development', icon: 'chrome' },
    ],
  },
  {
    name: 'Styling & Design Systems',
    level: SkillLevel.EXPERT,
    items: [
      { title: 'TailwindCSS', icon: 'tailwindcss' },
      { title: 'Ant Design', icon: 'ant-design' },
      { title: 'Design consistency', icon: 'layers' },
      { title: 'Component-based UI', icon: 'cubes' },
    ],
  },
  {
    name: 'Backend & API Fundamental',
    level: SkillLevel.WORKING,
    items: [
      { title: 'RESTful API design principles', icon: 'diagram' },
      { title: 'Basic Node.js', icon: 'node' },
      { title: 'Basic MongoDB', icon: 'mongodb' },
      { title: 'Version control with Git/GitHub', icon: 'git-branch' },
    ],
  },
  {
    name: 'DevOps & Infrastructure Basics',
    level: SkillLevel.WORKING,
    items: [
      { title: 'Basic CI/CD workflow', icon: 'workflow' },
      { title: 'Environment setup', icon: 'settings' },
      { title: 'Build & deployment fundamentals', icon: 'package' },
    ],
  },
  {
    name: 'Programming Languages (Familiar)',
    level: SkillLevel.WORKING,
    items: [{ title: 'Go (Golang) - basic understanding', icon: 'go' }],
  },
  {
    name: 'Tools & Workflow',
    level: SkillLevel.ADVANCED,
    items: [
      { title: 'GitHub, Jira', icon: 'github' },
      { title: 'Figma, Postman', icon: 'figma' },
      { title: 'VS Code', icon: 'vs-code' },
      { title: 'Notion, Telegram, Discord', icon: 'chatting' },
    ],
  },
  {
    name: 'Professional Skills',
    level: SkillLevel.ADVANCED,
    items: [
      { title: 'Team collaboration' },
      { title: 'Problem solving & self-learning' },
      { title: 'Attention to detail' },
      { title: 'Time management' },
      { title: 'Adaptability' },
      { title: 'Ownership & responsibility' },
    ],
  },
]
