import Link from 'next/link';

const QuestionForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  // TODO: adapt form from assignment 1 here
  // Reusable for update
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-left text-3xl">{type} Question</h1>
      <p className="text-left max-w-md">{type} a question.</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-5"
      >
        <label>
          <span className="flex font-semibold text-base text-gray-700">
            Title
          </span>
          <textarea
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Enter title here...."
            required
          />
        </label>
        <label>
          <span className="flex font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Enter description here...."
            required
          />
        </label>
        <label>
          <span className="flex font-semibold text-base text-gray-700">
            Categories
          </span>
          <textarea
            value={post.categories}
            onChange={(e) => setPost({ ...post, categories: e.target.value })}
            placeholder="Enter categories here...."
            required
          />
        </label>
        <label>
          <span className="flex font-semibold text-base text-gray-700">
            Complexity
          </span>
          <select
            id="complexity"
            value={post.complexity}
            onChange={(e) => setPost({ ...post, complexity: e.target.value })}
            required
          >
            <option value="" defaultValue disabled hidden>
              Select complexity
            </option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default QuestionForm;
