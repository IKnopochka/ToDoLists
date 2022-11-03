import React, {memo} from 'react';

type PropsType = {
  title: string;
  isButtonDisabled: boolean;
  onClick: () => void;
};

export const CustomButton: React.FC<PropsType> = memo(({title, isButtonDisabled, onClick}) => {
  return (
    <div>
      <button disabled={isButtonDisabled} onClick={onClick}>
        {title}
      </button>
    </div>
  );
});
