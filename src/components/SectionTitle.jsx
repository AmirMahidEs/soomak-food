export default function SectionTitle({ children }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-semibold text-white">
        <span className="text-somak-gold2">{children}</span>
      </h2>
      <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-somak-gold to-transparent" />
    </div>
  );
}
