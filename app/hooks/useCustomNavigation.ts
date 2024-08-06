import { useRouter } from 'next/navigation';

const useCustomNavigation = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return {navigate};
};

export default useCustomNavigation;
