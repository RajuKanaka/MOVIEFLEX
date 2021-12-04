import { img_300, unavailable } from "../../config/config";
import { Badge } from "@material-ui/core";
import "./SingleComponent.css";
import CustomDailog from "../CustomDailog/CustomDailog";
const SingleComponent = ({ date, id, name, media, image, vote }) => {
  return (
    <CustomDailog id={id} media_type={media}>
      <Badge badgeContent={vote} color={vote <= 5 ? "secondary" : "primary"} />
      <img
        className="poster"
        src={image ? `${img_300}/${image}` : unavailable}
        alt={name}
      />
      <b className="title"> {name}</b>
      <span className="subTitle">
        {media === "movie" ? "movie" : "TV series"}
        <span className="subTitle"> {date}</span>
      </span>
    </CustomDailog>
  );
};
export default SingleComponent;
