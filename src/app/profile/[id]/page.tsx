const ProfilePage = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="text-4xl">
        Profile Page{" "}
        <span className="p-2 rounded bg-blue-400 text-gray-900">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default ProfilePage;
