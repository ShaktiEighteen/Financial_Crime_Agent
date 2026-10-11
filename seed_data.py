"""
seed_data.py - FalkorDB Graph Seeding Script for Financial Crime Agent
Populates FalkorDB with synthetic entities: Accounts, Persons, Companies, Devices, and Transfers.
"""

import sys

def seed_falkordb(host='localhost', port=6379):
    try:
        from falkordb import FalkorDB
    except ImportError:
        print("falkordb package not installed. Run: pip install falkordb")
        return False

    print(f"Connecting to FalkorDB at {host}:{port}...")
    try:
        db = FalkorDB(host=host, port=port)
        graph = db.select_graph('financial_crime_graph')
        
        # Clear existing
        try:
            graph.delete()
            print("Reset previous graph data.")
        except Exception:
            pass
        
        graph = db.select_graph('financial_crime_graph')

        # 1. Create Mule Ring Scenario
        print("Seeding Mule Ring entities & circular flow...")
        query = """
        CREATE (a1:Account {id: 'ACC-101', name: 'Alex Rivera', risk: 94, balance: 54200}),
               (a2:Account {id: 'ACC-102', name: 'Jordan Lee', risk: 92, balance: 48500}),
               (a3:Account {id: 'ACC-103', name: 'Taylor Kim', risk: 89, balance: 46100}),
               (a4:Account {id: 'ACC-104', name: 'Sam Patel', risk: 91, balance: 44000}),
               (a5:Account {id: 'ACC-105', name: 'Morgan Chen', risk: 95, balance: 42000}),
               (d1:Device {id: 'DEV-9842', model: 'iPhone 15 Pro', uuid: 'hw_a8f921', risk: 98}),
               (m1:Merchant {id: 'MER-88', name: 'Apex Offshore Pay', jurisdiction: 'Seychelles', risk: 96}),
               (a1)-[:TRANSFERRED_TO {amount: 48500, timestamp: '2026-10-08T10:14:00Z'}]->(a2),
               (a2)-[:TRANSFERRED_TO {amount: 46100, timestamp: '2026-10-08T14:22:00Z'}]->(a3),
               (a3)-[:TRANSFERRED_TO {amount: 44000, timestamp: '2026-10-09T09:05:00Z'}]->(a4),
               (a4)-[:TRANSFERRED_TO {amount: 42000, timestamp: '2026-10-09T18:40:00Z'}]->(a5),
               (a5)-[:TRANSFERRED_TO {amount: 38500, timestamp: '2026-10-10T08:12:00Z'}]->(a1),
               (a5)-[:TRANSFERRED_TO {amount: 3500, timestamp: '2026-10-10T08:15:00Z'}]->(m1),
               (a1)-[:SHARES_DEVICE]->(d1),
               (a2)-[:SHARES_DEVICE]->(d1),
               (a3)-[:SHARES_DEVICE]->(d1),
               (a4)-[:SHARES_DEVICE]->(d1),
               (a5)-[:SHARES_DEVICE]->(d1);
        """
        graph.query(query)
        print("Mule Ring seeded successfully.")

        # 2. Query confirmation
        res = graph.query("MATCH (n) RETURN count(n) AS total_nodes")
        print(f"FalkorDB Graph Status: {res.result_set[0][0]} nodes indexed.")
        return True
    except Exception as e:
        print(f"FalkorDB connection failed ({e}). Running in standalone web visualization mode.")
        return False

if __name__ == '__main__':
    seed_falkordb()
