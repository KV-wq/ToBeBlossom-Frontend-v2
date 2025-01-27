const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-30">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-black z-40"></div>
    </div>
  );
};

export default Loader;
