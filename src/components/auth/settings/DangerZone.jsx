import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../../hooks/useTitle";
import AnimatePage from "../../Shared/AnimatePage";
import DeleteModal from "./DeleteModal";

const DangerZone = () => {
  useTitle("Danger zone");
  const [open, setOpen] = useState(false);

  return (
    <AnimatePage>
      <div>
        <div className="max-full mx-auto md:mt-3 bg-white p-8 shadow shadow-slate-300 font-normal">
          <h1 className="md:text-4xl text-3xl font-medium">Delete account</h1>
          <div className="bg-red-100 p-5 md:p-3 text-red-700 rounded-lg mt-4">
            <h2>Deleting your account will:</h2>
            <p>
              Permanently delete your profile.
            </p>
            <p>
              <b className="mr-1">Impotent:</b>
              Deleting your account is unrecoverable and cannot be undone. Feel
              free to contact{" "}
              <a
                href="mailto:anafshop.com@gmail.com"
                className="font-semibold"
              >
                anafshop.com@gmail.com
              </a>{" "}
              with any questions.
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => setOpen(true)}
              className="mt-3 bg-red-600 text-white p-2 px-4 rounded"
            >
              Delete account
            </button>
          </div>
        </div>
        {open && <DeleteModal setOpen={setOpen} />}
      </div>
    </AnimatePage>
  );
};

export default DangerZone;
