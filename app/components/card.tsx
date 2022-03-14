mport { Link } from "remix";

export const Card: React.FC<{
  imageSrc: string;
  text: string;
  href: string;
  alt: string;
}> = ({ imageSrc, text, href, alt }) => {
  return (
    <Link to={href}>
      <button className="flex flex-col p-3 m-3 items-center justify-center bg-gray-100 hover:bg-purple-100 rounded-lg shadow">
        <p>{text}</p>
        <img src={imageSrc} alt={alt} className="w-24 h-24" />
      </button>
    </Link>
  );
};
