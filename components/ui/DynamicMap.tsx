type Props = {
  latitude: number | any;
  longitude: number | any;
  width?: string;
  height?: string;
};
const DynamicMap = ({ latitude, longitude }: Props) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1659855038378!5m2!1sen!2sus`;

  return (
    <iframe
      src={mapUrl}
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="min-h-[350px]  sm:max-w-[200px]"
    ></iframe>
  );
};

export default DynamicMap;
