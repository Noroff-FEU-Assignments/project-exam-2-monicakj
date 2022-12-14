import defaultAvatar from "../assets/default-avatar.png";

export default function DefaultAvatarImage (props) {
  return <img className={props.class} src={props.image !== "" && props.image !== null ? props.image : defaultAvatar} alt={props.alt + `'s avatar`} />;
}