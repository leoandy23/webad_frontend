import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="border-0 text-primary">
      <i className="bi bi-arrow-left"></i> Atras
    </button>
  );
};

export default BackButton;
