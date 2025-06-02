// Reminder: Start the server with 'node index.js' before running this test script.

const http = require('http');
const assert = require('assert');

const HOST = 'localhost';
const PORT = 3000;

// Helper function to make GET requests
function getRequest(path, callback) {
  const options = {
    hostname: HOST,
    port: PORT,
    path: path,
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        callback(null, res, jsonData);
      } catch (e) {
        callback(e, res, data); // Send raw data if JSON parsing fails
      }
    });
  });

  req.on('error', (error) => {
    callback(error, null, null);
  });

  req.end();
}

// Test Case 1: Valid City
function testValidCity() {
  getRequest('/time/Sao_Paulo', (error, res, body) => {
    if (error) {
      console.error('Test Valid City FAILED: Request error:', error);
      return;
    }

    try {
      assert.strictEqual(res.statusCode, 200, `Expected status 200, got ${res.statusCode}`);
      assert.ok(body && typeof body === 'object', 'Response body should be a JSON object');
      assert.strictEqual(body.city, 'Sao_Paulo', `Expected city "Sao_Paulo", got "${body.city}"`);
      assert.ok(body.time, 'Response should contain a "time" key');
      assert.ok(/\d{2}:\d{2}:\d{2}/.test(body.time), `Time format should be HH:mm:ss, got "${body.time}"`);
      console.log('Test Valid City PASSED');
    } catch (e) {
      console.error('Test Valid City FAILED:', e.message);
      console.error('Response body:', body); // Log body for debugging
    }
  });
}

// Test Case 2: Invalid City
function testInvalidCity() {
  getRequest('/time/InvalidCityName', (error, res, body) => {
    if (error) {
      console.error('Test Invalid City FAILED: Request error:', error);
      return;
    }

    try {
      assert.strictEqual(res.statusCode, 404, `Expected status 404, got ${res.statusCode}`);
      assert.ok(body && typeof body === 'object', 'Response body should be a JSON object');
      assert.ok(body.error, 'Response should contain an "error" key');
      console.log('Test Invalid City PASSED');
    } catch (e) {
      console.error('Test Invalid City FAILED:', e.message);
      console.error('Response body:', body); // Log body for debugging
    }
  });
}

// Run tests
console.log('Starting tests...');
testValidCity();
testInvalidCity();

// Add a small delay to allow async operations to complete before script exits
setTimeout(() => console.log('Tests finished. Check results above.'), 1000);
