import FadeIn from '@/components/ui/FadeIn';
import ApplicationForm from '@/components/ui/ApplicationForm';

export default function ApplicationSection() {
  return (
    <section className="section-padding bg-alt" id="apply">
      <div className="container">
        <FadeIn>
          <ApplicationForm />
        </FadeIn>
      </div>
    </section>
  );
}
