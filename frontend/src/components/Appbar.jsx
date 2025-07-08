export const Appbar = () => {
  return (
    <div className="h-20 flex justify-between items-center p-6 shadow">
      <div className="text-3xl font-extrabold">Payments App</div>
      <div className="flex items-center gap-2">
        <div className=" text-2xl">Hello, </div>
        <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-2xl">U</div>
        </div>
      </div>
    </div>
  );
};
