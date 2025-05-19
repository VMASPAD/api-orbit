import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";
  
  import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
  
  const features = [
    {
      Icon: FileTextIcon,
      name: "Create your own APIs",
      description: "Create APIs with your own data and logic.",
      href: "/",
      cta: "Create API",
      background: <img className="absolute -right-20 opacity-60" src={"/img (4).png"}/>,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: InputIcon,
      name: "Personalize your APIs",
      description: "Modify your APIs with your own data and logic.",
      href: "/",
      cta: "Create API",
      background: <img className="absolute -right-20 opacity-60" src={"/img (1).png"}/>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Managage your APIs",
      description: "Manage your APIs with your own data and logic.",
      href: "/",
      cta: "Create API",
      background: <img className="absolute -right-20 opacity-60" src={"/img (2).png"}/>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: "Template of Data",
      description: "Template of data for your APIs.",
      href: "/",
      cta: "Create API",
      background: <img className="absolute -right-20 -top-80 opacity-60" src={"/img (1).png"}/>,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Preview Content",
      description:
        "Preview the content of your APIs before deploying.",
      href: "/",
      cta: "Create API",
      background: <img className="absolute -right-20 top-20 opacity-60" src={"/img (5).png"}/>,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];
  
  export function Bento() {
    return (
        <div className="m-52">
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid></div>
    );
  }
  