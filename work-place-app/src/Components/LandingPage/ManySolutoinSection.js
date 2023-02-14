import React from "react";
import "./landingpage.css";
import DesignLogo from "../../assets/designlogo.png";
import MarketingLogo from "../../assets/marketing.svg";
import InfoCard from "../common/InfoCard.js";
function ManySolutoinSection() {
  const list = [
    {
      title: "Marketing &Communication",
      subtitle: "237 Jobs Available",
      icon: MarketingLogo,
    },
    {
      title: "Design & Creative",
      subtitle: "237 Jobs Available",
      icon: DesignLogo,
    },
    {
      title: "Marketing &Communication",
      subtitle: "237 Jobs Available",
      icon: MarketingLogo,
    },
    {
      title: "Design & Creative",
      subtitle: "237 Jobs Available",
      icon: DesignLogo,
    },
    {
      title: "Marketing &Communication",
      subtitle: "237 Jobs Available",
      icon: MarketingLogo,
    },
    {
      title: "Design & Creative",
      subtitle: "237 Jobs Available",
      icon: DesignLogo,
    },
    {
      title: "Marketing &Communication",
      subtitle: "237 Jobs Available",
      icon: MarketingLogo,
    },
    {
      title: "Design & Creative",
      subtitle: "237 Jobs Available",
      icon: DesignLogo,
    },
  ];
  return (
    <div className="many-solution-container">
      <h2>
        One Platform Many <span>Solutions</span>
      </h2>
      <div
      className="many-solution-list-container"
      >
        {list.map((item, index) => {
          return (
            <InfoCard
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ManySolutoinSection;
