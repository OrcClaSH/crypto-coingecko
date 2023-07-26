import { FC } from 'react';

import ContentLoader from 'react-content-loader';

import st from './SkeletonCard.module.scss';

const MyLoader: FC = () => (
  <div className={st.skeleton}>
    <ContentLoader
      speed={2}
      width={375}
      height={72}
      viewBox="0 0 375 72"
      backgroundColor="#c9c9c9"
      foregroundColor="#ecebeb"
    >
      <rect x="76" y="13" rx="3" ry="3" width="88" height="12" />
      <rect x="77" y="36" rx="3" ry="3" width="75" height="9" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="35" cy="28" r="20" />
      <rect x="295" y="12" rx="3" ry="3" width="73" height="10" />
      <rect x="318" y="37" rx="3" ry="3" width="49" height="6" />
      <rect x="193" y="16" rx="0" ry="0" width="80" height="27" />
    </ContentLoader>
  </div>
);

export default MyLoader;
