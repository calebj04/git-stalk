import { Button } from "@/components/auth/ui/button";

export default function Profile() {
  return (
    <div className="w-full flex items-center justify-center p-12">
      <div className="bg-white rounded-xl w-full max-w-96 h-96 p-7">
        <div className="relative h-full w-full flex flex-col items-center justify-center">
          <div className="text-black">img</div>
          <div className="w-full absolute bottom-0">
            <Button type="submit" className="w-full">
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
