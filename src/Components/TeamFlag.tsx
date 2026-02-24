import ResponsiveImage from "./ResponsiveImage";
import { Team } from "../Types/types";
const s3Path = `${process.env.REACT_APP_S3}/images/Team-shield/`;

const TeamFlag = ({team}: {team: Team}) => {
  return (
    <a href={team.url} target="_blank" rel="noopener noreferrer">
      <ResponsiveImage
        id={`shield-${team.name}`}
        src={`${s3Path}${team.code}.webp`}
        alt={`${team.code}`}
      />
    </a>
  );
};

export default TeamFlag;
