export const steps: any = [
  {
    tour: "user",
    steps: [
        {
          icon: <>👋</>,
          title: "Welcome to RecruiterAI!",
          content: <>Welcome to RecruiterAI, an AI powered recruitment automation platform!</>,
          selector: "#onborda-welcome",
          side: "bottom-left",
          showControls: true,
          pointerPadding: 20,
          pointerRadius: 24,
        },
        {
          icon: <>🎩</>,
          title: "RecruiterAI Dashboard",
          content: <>Your personalized dashboard is the single place where you can find all your relevant information on RecruiterAI.</>,
          selector: "#onborda-dashboard",
          side: "right",
          showControls: true,
          pointerPadding: -1,
          pointerRadius: 24,
        },
        {
          icon: <>🪄</>,
          title: "Create Agents",
          content: (
            <>
              Create your first agent, just have a basic conversation to configure your recruiter agent.
            </>
          ),
          selector: "#onborda-agents",
          side: "right",
          showControls: true,
          pointerPadding: -1,
          pointerRadius: 24,
        },
        {
          icon: <>🪄</>,
          title: "Need Help",
          content: (
            <>
              If you ever need any help, head over to the faqs page to find most commonly asked questions, or reach out to our team.
            </>
          ),
          selector: "#onborda-help",
          side: "right",
          showControls: true,
          pointerPadding: -1,
          pointerRadius: 24,
        },
    ]
  }
];