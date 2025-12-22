import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaWallet, FaCalendarAlt, FaFolderOpen, FaFileSignature, FaMoneyBill } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import '../styles/dashboard.css'
import Checkbox from "@mui/material/Checkbox";
import AddAccountModal from "../modals/add_acounts"; 
import AddBillModal from "../modals/add_bill";
import TransactionModal from "../modals/transactionmodal";
import TransferModul from "../modals/transfer";
import AddBudgetModal from "../modals/BudgetModal";
import UsedBudgetModal from '../modals/usedBudgetModal';
import Statistics from '../components/statistics';

function Dashboard() {
  return (
    <div>
      <div className="container-fluid ">
       <Statistics/>
        <div class="row-card-actions  m-5 justify-content-center rounded-4">
          <div class="card-header">
            <h2 class="px-4"><i class="fas fa-bolt"></i> Quick Actions</h2>
          </div>
          <div class="quick-actions-grid row m-5 justify-content-center rounded-4">
            <div class="action-btn col-lg-4 col-sm-12" data-bs-toggle="modal"
              data-bs-target="#addTransactionModal">
              <div class="action-icon">
                <i class="fas fa-plus-circle"></i>
              </div>
              <div class="action-text">Add Transaction</div>
            </div>
            <div
              className="action-btn col-lg-4 col-sm-12"
              data-bs-toggle="modal"
              data-bs-target="#transferModal"
            >
              <div className="action-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <div className="action-text">Transfer Money</div>
            </div>

            
             <div class="action-btn col-lg-4 col-sm-12" data-bs-toggle="modal" data-bs-target="#addBudgetModal">
              <div class="action-icon">
                <i class="fas fa-bullseye"></i>
              </div>
              <div class="action-text">Set Budget</div>
            </div>

            <div class="action-btn col-lg-4 col-sm-12" data-bs-toggle="modal" data-bs-target="#addBillModal">
              <div class="action-icon">
                <i class="fas fa-file-invoice"></i>
              </div>
              <div class="action-text">Add Bill</div>
            </div>

            <div class="action-btn col-lg-4 col-sm-12" data-bs-toggle="modal" data-bs-target="#addAccountModal">
              <div class="action-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="action-text">Add Account</div>
            </div>
            <div class="action-btn col-lg-4 col-sm-12" data-bs-toggle="modal" data-bs-target="#usedBudgetModal">
              <div class="action-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="action-text">Use Budget</div>
            </div>

          </div>
        </div>
        {/* bill */}
        <AddBillModal/>


        {/* transfer modal */}
        <TransferModul/>

        {/* Modal transaction*/}
             <TransactionModal/>
        {/* set budget */}
        <AddBudgetModal />
        {/* add acount */}
        
             <AddAccountModal/>
        {/* used budget */}
            <UsedBudgetModal/>
      </div>
    </div>
  )
}


export default Dashboard;

