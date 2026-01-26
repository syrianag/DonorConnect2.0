
# donorConnect-BC2
DonorConnect is a API-driven platform for managing donors, donations, and campaigns. It enables clean client–server communication using structured JSON, supports endpoints for recent donors, top donations, and active campaigns, and demonstrates full frontend-to-backend data flow.
=======
## 🌟 Features

- **Donor Management**: Track and manage donor information
- **Donation Tracking**: Monitor donations with detailed records
- **Campaign Management**: Create and manage fundraising campaigns
- **RESTful API**: Clean JSON-based API endpoints
- **Real-time Data**: Access recent donors, top donations, and active campaigns
- **Full-Stack Integration**: Seamless frontend-to-backend data flow

## RBAC 
- **Each staff member has a specified password for their login


## 🚀 Key Endpoints

The platform provides the following core API endpoints:

- **Recent Donors**: Retrieve a list of recent contributors
- **Top Donations**: Access highest donation records
- **Active Campaigns**: View currently running fundraising campaigns

## 🛠️ Tech Stack
# DonorConnect

DonorConnect is an API-driven platform for managing donors, donations, and campaigns. It enables clean client–server communication using structured JSON, supports endpoints for recent donors, top donations, and active campaigns, and demonstrates full frontend-to-backend data flow.

## 🌟 Features

- **Donor Management**: Track and manage donor information
- **Donation Tracking**: Monitor donations with detailed records
- **Campaign Management**: Create and manage fundraising campaigns
- **RESTful API**: Clean JSON-based API endpoints
- **Real-time Data**: Access recent donors, top donations, and active campaigns
- **Full-Stack Integration**: Seamless frontend-to-backend data flow

## 🚀 Key Endpoints

The platform provides the following core API endpoints:

- **Recent Donors**: Retrieve a list of recent contributors
- **Top Donations**: Access highest donation records
- **Active Campaigns**: View currently running fundraising campaigns

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Backend**: API-driven architecture
- **Data Format**: JSON for structured communication
- **Communication**: RESTful API principles

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "donorConnect - BC2"
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
donorConnect - BC2/
├── components/        # React components
├── pages/            # Next.js pages and API routes
│   └── api/         # API endpoints
├── public/          # Static assets
├── styles/          # CSS/styling files
├── lib/             # Utility functions and helpers
└── README.md        # Project documentation
```

## 🔌 API Documentation

### GET /api/donors/recent
Retrieves a list of recent donors.

**Response:**
```json
{
  "donors": [
    {
      "id": "string",
      "name": "string",
      "amount": "number",
      "date": "string"
    }
  ]
}
```

### GET /api/donations/top
Retrieves the top donations.

**Response:**
```json
{
  "donations": [
    {
      "id": "string",
      "donor": "string",
      "amount": "number",
      "campaign": "string"
    }
  ]
}
```

### GET /api/campaigns/active
Retrieves currently active campaigns.

**Response:**
```json
{
  "campaigns": [
    {
      "id": "string",
      "name": "string",
      "goal": "number",
      "raised": "number",
      "status": "string"
    }
  ]
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape DonorConnect
- Built with Next.js and modern web technologies

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Note**: This is a demonstration project showcasing full-stack development with API-driven architecture and clean client-server communication patterns.
