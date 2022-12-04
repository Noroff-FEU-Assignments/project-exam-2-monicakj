import defaultBanner from "../../images/default-banner.png";

export default function DefaultBannerImage (props) {
  return (
    <div style={{ backgroundImage: `url(${props.image !== "" && props.image !== null ? props.image : defaultBanner})` }} className={props.class}>
      {props.children}
    </div>
  );
}