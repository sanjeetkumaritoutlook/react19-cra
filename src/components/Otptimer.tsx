import React from "react";

function OtptimerCard() {
  const [timeLeft, setTimeLeft] = React.useState(60); // 60 seconds timer

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  return (
    <div>
      <h2>OTP Timer</h2>
      <p>{timeLeft} seconds left</p>

    </div>
  );
}
export default OtptimerCard;
