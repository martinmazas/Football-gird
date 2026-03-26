import ResponsiveImage from "./ResponsiveImage";
import { Team } from "../Types/types";
const s3Path = `${process.env.REACT_APP_S3}/images/Team-shield/`;

const TeamFlag = ({team}: {team: Team}) => {
  return (
    <div className="grid-label-card">
      <a href={team.url} target="_blank" rel="noopener noreferrer">
        <ResponsiveImage
          id={`shield-${team.name}`}
          src={`${s3Path}${team.code}.webp`}
          alt={`${team.code}`}
        />
      </a>
      <span className="grid-label-card__name">{team.name}</span>
    </div>
  );
};

export default TeamFlag;
