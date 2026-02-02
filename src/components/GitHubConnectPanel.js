import React, { useState } from 'react';
import './GitHubConnectPanel.css';
import { FaGithub, FaCode, FaStar, FaCodeBranch } from 'react-icons/fa';

function GitHubConnectPanel({ apiBaseUrl, fetchWithAuth }) {
  const [githubUsername, setGithubUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [githubData, setGithubData] = useState(null);

  const connectGitHub = async () => {
    if (!githubUsername.trim()) {
      setMessage('❌ Please enter GitHub username');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/connect-github/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ github_username: githubUsername })
      });

      if (response.ok) {
        const data = await response.json();
        setGithubData(data);
        setMessage('✅ GitHub connected successfully!');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to connect GitHub'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-connect-panel">
      <div className="github-header">
        <h2><FaGithub /> Connect GitHub</h2>
        <p>Link your GitHub profile to showcase your developer skills</p>
      </div>

      {message && <div className="github-message">{message}</div>}

      <div className="connect-section">
        <div className="input-group">
          <label>GitHub Username</label>
          <div className="input-with-icon">
            <FaGithub className="input-icon" />
            <input
              type="text"
              placeholder="octocat"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="github-input"
            />
          </div>
        </div>
        <button
          className="connect-btn"
          onClick={connectGitHub}
          disabled={loading}
        >
          <FaGithub /> {loading ? 'Connecting...' : 'Connect GitHub'}
        </button>
      </div>

      {githubData && (
        <div className="github-profile">
          <div className="profile-header">
            <img
              src={githubData.avatar_url}
              alt={githubData.login}
              className="profile-avatar"
            />
            <div className="profile-info">
              <h3>{githubData.name || githubData.login}</h3>
              <a
                href={`https://github.com/${githubData.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
              >
                @{githubData.login}
              </a>
              {githubData.bio && <p className="profile-bio">{githubData.bio}</p>}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <FaCodeBranch className="stat-icon" />
              <div className="stat-value">{githubData.public_repos || 0}</div>
              <div className="stat-label">Repositories</div>
            </div>
            <div className="stat-item">
              <FaStar className="stat-icon" />
              <div className="stat-value">{githubData.total_stars || 0}</div>
              <div className="stat-label">Stars</div>
            </div>
            <div className="stat-item">
              <FaCode className="stat-icon" />
              <div className="stat-value">{githubData.followers || 0}</div>
              <div className="stat-label">Followers</div>
            </div>
          </div>

          {githubData.top_languages && (
            <div className="languages-section">
              <h4>🔤 Top Languages</h4>
              <div className="languages-list">
                {githubData.top_languages.map((lang, i) => (
                  <div key={i} className="language-badge">
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-percentage">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {githubData.recent_repos && (
            <div className="repos-section">
              <h4>📦 Recent Repositories</h4>
              <div className="repos-list">
                {githubData.recent_repos.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-card"
                  >
                    <div className="repo-name">{repo.name}</div>
                    {repo.description && (
                      <div className="repo-description">{repo.description}</div>
                    )}
                    <div className="repo-stats">
                      {repo.language && (
                        <span className="repo-language">
                          <span className="lang-dot"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="repo-stars">
                        <FaStar /> {repo.stargazers_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="info-section">
        <h4>ℹ️ Why Connect GitHub?</h4>
        <ul>
          <li>Showcase your coding projects to the community</li>
          <li>Get a developer badge on your profile</li>
          <li>Display your programming language expertise</li>
          <li>Automatically sync your GitHub stats</li>
          <li>Connect with other developers</li>
        </ul>
      </div>
    </div>
  );
}

export default GitHubConnectPanel;
