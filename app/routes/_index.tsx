import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Real-time Document Collaboration`,
      description: `Edit documents together with your team in real-time, with changes synced instantly across all users.`,
      icon: <i className="las la-file-alt"></i>,
    },
    {
      heading: `Visual Task Management`,
      description: `Organize work with intuitive Kanban boards that give you clear visibility into project progress.`,
      icon: <i className="las la-tasks"></i>,
    },
    {
      heading: `Unified Team Communication`,
      description: `Keep all team discussions in one place with threaded conversations and instant messaging.`,
      icon: <i className="las la-comments"></i>,
    },
    {
      heading: `Smart File Management`,
      description: `Store, share and version control all your files in a centralized location accessible to your team.`,
      icon: <i className="las la-folder-open"></i>,
    },
    {
      heading: `Powerful Search`,
      description: `Find any document, conversation or file instantly with our intelligent search across all content.`,
      icon: <i className="las la-search"></i>,
    },
    {
      heading: `Enterprise Security`,
      description: `Rest easy with bank-level encryption, SSO authentication and granular permission controls.`,
      icon: <i className="las la-shield-alt"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Head of Remote Operations, TechFlow Inc`,
      content: `Collabyto transformed how our remote team works. We've cut meeting time by 50% and everyone knows exactly what they need to do.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Project Manager, Design Co`,
      content: `The unified workspace is a game-changer. No more switching between apps - everything our team needs is right here.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emma Watson`,
      designation: `CEO, StartupX`,
      content: `We've seen a 40% boost in team productivity since moving to Collabyto. The ROI was evident within the first month.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Startup`,
      description: `Perfect for small teams just getting started`,
      monthly: 12,
      yearly: 120,
      features: [
        `Up to 10 team members`,
        `Basic collaboration features`,
        `5GB storage`,
        `Email support`,
      ],
    },
    {
      title: `Business`,
      description: `For growing teams that need more power`,
      monthly: 29,
      yearly: 290,
      features: [
        `Up to 50 team members`,
        `Advanced collaboration`,
        `50GB storage`,
        `Priority support`,
        `Admin controls`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 99,
      yearly: 990,
      features: [
        `Unlimited team members`,
        `Enterprise features`,
        `Unlimited storage`,
        `24/7 support`,
        `Custom integration`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can we get started?`,
      answer: `You can start using Collabyto immediately after signing up. Our onboarding process takes less than 5 minutes.`,
    },
    {
      question: `Can I import data from other tools?`,
      answer: `Yes, Collabyto supports importing from major collaboration tools including Slack, Trello, and Google Workspace.`,
    },
    {
      question: `Is my data secure?`,
      answer: `Absolutely. We use bank-level encryption and comply with GDPR, CCPA, and other major privacy regulations.`,
    },
    {
      question: `What kind of support do you offer?`,
      answer: `We provide email support for all plans, with priority support for Business plans and 24/7 dedicated support for Enterprise customers.`,
    },
  ]

  const steps = [
    {
      heading: `Sign Up Your Team`,
      description: `Create your workspace in 30 seconds and invite team members`,
    },
    {
      heading: `Import Your Work`,
      description: `Easily import existing projects and files from other tools`,
    },
    {
      heading: `Start Collaborating`,
      description: `Begin working together in real-time with your team`,
    },
    {
      heading: `See Results`,
      description: `Watch productivity soar as your team works in perfect sync`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Constantly switching between apps, losing focus and time`,
    },
    {
      emoji: `😤`,
      title: `Can't find important information buried in different tools`,
    },
    {
      emoji: `😩`,
      title: `Team communication is fragmented and disorganized`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Unite Your Team's Work in One Powerful Workspace`}
        subtitle={`Stop jumping between apps. Collabyto brings document editing, task management, and team chat together in one seamless platform.`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/xHEji0-collabyto-wp3L`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={10000}
            suffixText={`teams collaborating better`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Companies`} />
      <LandingPainPoints
        title={`Teams Waste 2.5 Hours Daily Switching Between Apps - Stop The Chaos`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Path to Seamless Collaboration`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything Your Team Needs, All in One Place`}
        subtitle={`Powerful features designed to make collaboration effortless`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of High-Performing Teams`}
        subtitle={`See how organizations are transforming their workflow with Collabyto`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Simple Pricing for Teams of All Sizes`}
        subtitle={`Start free, upgrade as you grow`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions`}
        subtitle={`Everything you need to know about Collabyto`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform How Your Team Works?`}
        subtitle={`Join thousands of teams already collaborating better with Collabyto`}
        buttonText={`Start Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
