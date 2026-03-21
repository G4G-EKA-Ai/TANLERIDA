# 🤝 Contributing to TANLERIDA

Thank you for your interest in contributing to **TANLERIDA** (Tangred E-Commerce Platform)! We welcome contributions from the community and are grateful for your help.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [vivek@go4garage.in](mailto:vivek@go4garage.in).

---

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/G4G-EKA-Ai/TANLERIDA/issues) to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots or GIFs if possible**

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/G4G-EKA-Ai/TANLERIDA/issues). Create an issue with the following:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Explain why this enhancement would be useful**

### 📝 Pull Requests

1. Fork the repository
2. Create a new branch from `main`: `git checkout -b feature/my-feature`
3. Make your changes
4. Ensure tests pass and linting is clean
5. Commit your changes
6. Push to your fork
7. Open a Pull Request

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 20.x+
- npm 10.x+ or pnpm/yarn
- PostgreSQL 14.x+
- Git

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/TANLERIDA.git
cd TANLERIDA/tangred

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Set up the database
npx prisma generate
npx prisma migrate dev
npm run db:seed

# 5. Start development server
npm run dev
```

---

## 🎨 Style Guidelines

### TypeScript/JavaScript

We use **TypeScript** for type safety. Follow these guidelines:

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use explicit return types for functions
- Avoid `any` type when possible

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name: string;
}

function getUserById(id: string): Promise<User | null> {
  // implementation
}

// ❌ Avoid
function getUser(id) {
  // implementation
}
```

### React Components

- Use functional components with hooks
- Use PascalCase for component names
- Use camelCase for props and variables
- Keep components focused and single-responsibility

```typescript
// ✅ Good
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}
```

### Styling (Tailwind CSS)

- Use Tailwind utility classes
- Follow the existing design system
- Use semantic class names for custom CSS
- Keep responsive design in mind

```tsx
// ✅ Good
<button className="bg-[#C0392B] text-white px-6 py-3 rounded 
                   hover:bg-[#E74C3C] transition-colors duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed">
  Add to Cart
</button>
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Utilities | camelCase | `formatCurrency.ts` |
| Hooks | camelCase with 'use' prefix | `useCart.ts` |
| Styles | kebab-case | `globals.css` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |

---

## 📝 Commit Messages

We follow the **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Build process or auxiliary tool changes |

### Examples

```
feat(auth): add Google OAuth integration

fix(cart): resolve issue with cart item quantity update

docs(readme): update installation instructions

refactor(api): simplify payment verification logic
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**: `npm test`
4. **Run linting**: `npm run lint`
5. **Build successfully**: `npm run build`

### PR Template

When opening a pull request, please use this template:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes.

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by at least one maintainer
3. **Approval** from project owner for significant changes
4. **Merge** to `main` branch

---

## 🐛 Reporting Bugs

### Security Issues

**DO NOT** create public issues for security vulnerabilities. Instead:

1. Email [vivek@go4garage.in](mailto:vivek@go4garage.in) with details
2. Include steps to reproduce
3. We'll respond within 48 hours
4. Coordinate disclosure timeline

### General Bugs

Use the GitHub issue tracker:

1. Go to [Issues](https://github.com/G4G-EKA-Ai/TANLERIDA/issues)
2. Click "New Issue"
3. Select "Bug Report" template
4. Fill in all required information

---

## 💬 Communication

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: General questions, ideas
- **Email**: [vivek@go4garage.in](mailto:vivek@go4garage.in) for private matters

---

## 🏆 Recognition

Contributors will be:

- Listed in our [Contributors](./CONTRIBUTORS.md) file
- Mentioned in release notes for significant contributions
- Credited in documentation where applicable

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev/)

---

Thank you for contributing to TANLERIDA! 🎩✨
