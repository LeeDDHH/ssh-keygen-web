declare type SizeObj = {
  size: SizeType;
  setSize: React.Dispatch<React.SetStateAction<SizeType>>;
};

declare type HashObj = {
  hash: HashType;
  setHash: React.Dispatch<React.SetStateAction<HashType>>;
};

declare type CommentObj = {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

declare type StateObj = {
  sizeObj: SizeObj;
  hashObj: HashObj;
  commentObj: CommentObj;
};
