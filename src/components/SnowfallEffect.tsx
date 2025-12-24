import Snowfall from "react-snowfall";

const SnowfallEffect: React.FC = () => {
  return (
    <Snowfall
      snowflakeCount={120}
      speed={[0.5, 1.5]}
      wind={[-0.5, 1]}
      radius={[0.6, 1.6]}
      color="white"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
};

export default SnowfallEffect;
