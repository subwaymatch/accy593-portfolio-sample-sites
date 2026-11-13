import styles from "../site.module.css";
import type { WorkItem } from "../data";
import RfmChart from "./RfmChart";
import AbTestChart from "./AbTestChart";
import ElasticityCalc from "./ElasticityCalc";
import HomeFinder from "./HomeFinder";
import DrumLoop from "./DrumLoop";
import { OatMilkPost, PaletteBoard, PostersDetail, SkateGallery, TeesDetail, ZineDetail } from "./Extras";

function Showcase({ item }: { item: WorkItem }) {
  switch (item.demo) {
    case "rfm":
      return <RfmChart />;
    case "palette":
      return <PaletteBoard image={item.image} />;
    case "abtest":
      return <AbTestChart />;
    case "elasticity":
      return <ElasticityCalc />;
    case "homes":
      return <HomeFinder image={item.image} />;
    case "post":
      return <OatMilkPost />;
    case "skate":
      return <SkateGallery />;
    case "zine":
      return <ZineDetail image={item.image} />;
    case "beats":
      return <DrumLoop />;
    case "tees":
      return <TeesDetail image={item.image} />;
    case "posters":
      return <PostersDetail image={item.image} />;
  }
}

export default function WorkDetail({ item }: { item: WorkItem }) {
  return (
    <>
      <div className={styles.tagRow}>
        {item.tags.map((t) => (
          <span key={t} className={styles.tag}>
            {t}
          </span>
        ))}
      </div>
      <div className={styles.prose}>
        <h3>What I did</h3>
        {item.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>The work</h3>
        <Showcase item={item} />
      </div>
    </>
  );
}
