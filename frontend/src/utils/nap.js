const nap = (seconds = null) => {
  let length = seconds ? seconds * 1000 : 2000;
  setTimeout(() => {
    const data = "Just Sleep";
  }, length);
};

export default nap;
