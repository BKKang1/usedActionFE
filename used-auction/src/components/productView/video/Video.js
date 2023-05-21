import ReactPlayer from "react-player";
const Video = ({ path }) => {
  console.log(path);
  return (
    <div className="App">
      <ReactPlayer
        url={path}// s3 url
        controls={true}
      />
    </div>
  );
};
export default Video;
