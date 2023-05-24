import ReactPlayer from "react-player";
const Video = ({ path }) => {
  console.log(path);
  return (
    <div>
      <ReactPlayer
        url={path} // s3 url
        controls={true}
        width={"800px"}
        height={"400px"}
      />
    </div>
  );
};
export default Video;
