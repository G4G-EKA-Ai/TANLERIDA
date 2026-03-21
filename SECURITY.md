# 🔒 Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously at TANLERIDA. If you discover a security vulnerability, please follow these steps:

### 📧 Contact

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, email us at: **vivek@go4garage.in**

### What to Include

Please provide the following information:

1. **Description** - Clear description of the vulnerability
2. **Steps to Reproduce** - Detailed steps to reproduce the issue
3. **Impact** - Potential impact if exploited
4. **Suggested Fix** (optional) - If you have a suggestion

### Response Timeline

| Phase | Timeline | Action |
|-------|----------|--------|
| Acknowledgment | Within 24 hours | We acknowledge receipt |
| Investigation | 3-5 days | We investigate and validate |
| Fix Development | 1-2 weeks | We develop a fix |
| Disclosure | Coordinated | Public disclosure with credit |

### Bug Bounty

While we don't have a formal bug bounty program, we will:

- Credit you in the security advisory (if desired)
- Add you to our contributors list
- Send Tangred merchandise as a thank you

---

## Security Measures

### Authentication

- **Password Hashing**: bcryptjs with 12 salt rounds
- **Session Management**: JWT with HTTP-only cookies
- **OAuth Security**: PKCE flow for Google OAuth
- **Email Verification**: OTP required before account activation

### Data Protection

- **Encryption at Rest**: PostgreSQL with SSL
- **Encryption in Transit**: TLS 1.3 for all connections
- **Sensitive Data**: API keys stored in environment variables
- **Payment Data**: Tokenized by Razorpay (never touches our servers)

### API Security

- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Zod schemas validate all inputs
- **SQL Injection Prevention**: Prisma ORM uses parameterized queries
- **XSS Protection**: React's automatic escaping + CSP headers
- **CSRF Protection**: Built into NextAuth.js

### Infrastructure

- **DDoS Protection**: Vercel Edge Network
- **WAF**: Web Application Firewall rules
- **Dependency Scanning**: Automated vulnerability checks
- **Container Security**: Minimal Docker images (Alpine Linux)

---

## Security Best Practices for Users

### Account Security

1. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - No dictionary words

2. **Enable Two-Factor Authentication** (coming soon)
   - SMS or authenticator app
   - Required for admin accounts

3. **Keep Email Secure**
   - Use a secure email provider
   - Enable 2FA on your email account

### Shopping Security

1. **Verify HTTPS**
   - Always check for 🔒 in the address bar
   - URL should start with `https://`

2. **Use Secure Payment Methods**
   - UPI PIN required for every transaction
   - Card CVV never stored

3. **Monitor Your Orders**
   - Check order confirmations
   - Report suspicious activity immediately

---

## Security Checklist for Developers

### Before Deployment

- [ ] All dependencies updated (`npm audit fix`)
- [ ] Environment variables secured (no secrets in code)
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] Error messages don't leak sensitive info

### Regular Maintenance

- [ ] Weekly dependency updates
- [ ] Monthly security audits (`npm audit`)
- [ ] Quarterly penetration testing
- [ ] Annual security review

---

## Known Security Considerations

### Current Limitations

1. **Email Security**
   - Email is not end-to-end encrypted
   - Order confirmations sent via standard email

2. **AI Data Processing**
   - User photos processed by third-party AI services
   - Data subject to Google's and Anthropic's privacy policies

3. **Payment Data**
   - Full payment processing handled by Razorpay
   - We store only transaction IDs, not card details

### Mitigation Strategies

| Risk | Mitigation |
|------|------------|
| AI data exposure | Clear user consent, data deletion on request |
| Email interception | TLS encryption, no sensitive data in email |
| Session hijacking | HTTP-only cookies, short session duration |
| XSS attacks | Content Security Policy, input sanitization |

---

## Compliance

### Data Protection

- **GDPR**: European data protection regulations
- **PDPA**: Personal Data Protection Act (India)
- **PCI DSS**: Payment Card Industry standards (via Razorpay)

### Data Handling

- User data stored only as necessary
- Right to deletion honored
- Data export available on request
- No data selling to third parties

---

## Contact

For security concerns:

- **Email**: vivek@go4garage.in
- **Response Time**: Within 24 hours
- **PGP Key**: Available on request

---

## Acknowledgments

We thank the following security researchers who have responsibly disclosed vulnerabilities:

*No disclosures yet - be the first!*

---

Last Updated: March 2026
