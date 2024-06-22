

const Loader = () => (
    <div className="loader fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
        {[...Array(12)].map((_, index) => (
            <div key={index} className="loader_item" style={{ transform: `rotate(${index * 30}deg)`, animationDelay: `${-1.2 + (index * 0.1)}s` }}></div>
        ))}
    </div>
);

export default Loader;
