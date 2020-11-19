import React from "react";
import { Image } from "semantic-ui-react";

interface IProps {
    isPrimary: boolean;
    iconName: string;
    headerText: string;
    paragraphText: string;
}

export const HomePageSection: React.FC<IProps> = ({isPrimary, iconName, headerText, paragraphText}) => {
  return (
    <div className={`${isPrimary ? "primary" : "secondary"}-section`}>
      {isPrimary && <Image src={`assets/homepage/icons/${iconName}-icon.png`} />}
      <div className={`${isPrimary ? "primary" : "secondary"}-section-text`}>
        <h2>{headerText}</h2>
        <p>
          {paragraphText}
        </p>
      </div>
      {!isPrimary && <Image src={`assets/homepage/icons/${iconName}-icon.png`} />}
    </div>
  );
};