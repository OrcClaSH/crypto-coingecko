import { FC } from 'react';

import ContentLoader from 'react-content-loader';

const Skeleton: FC = () => (
  <ContentLoader
    speed={2}
    width={375}
    height={500}
    viewBox="0 0 375 500"
    backgroundColor="#c9c9c9"
    foregroundColor="#ecebeb"
  >
    <rect x="41" y="9" rx="3" ry="3" width="67" height="11" />
    <rect x="2" y="446" rx="3" ry="3" width="371" height="40" />
    <rect x="1" y="51" rx="3" ry="3" width="53" height="15" />
    <rect x="425" y="462" rx="3" ry="3" width="72" height="11" />
    <rect x="72" y="54" rx="3" ry="3" width="100" height="11" />
    <rect x="191" y="334" rx="3" ry="3" width="37" height="11" />
    <rect x="1" y="417" rx="3" ry="3" width="371" height="18" />
    <rect x="2" y="73" rx="3" ry="3" width="92" height="6" />
    <circle cx="14" cy="14" r="12" />
    <rect x="18" y="96" rx="0" ry="0" width="354" height="300" />
  </ContentLoader>
);

export default Skeleton;
